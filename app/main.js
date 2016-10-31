(function($){

    var Renderer = function(canvas){
        var canvas = $(canvas).get(0);
        var ctx = canvas.getContext("2d");
        var particleSystem;

        var that = {
            init:function(system){
                //
                // the particle system will call the init function once, right before the
                // first frame is to be drawn. it's a good place to set up the canvas and
                // to pass the canvas size to the particle system
                //
                // save a reference to the particle system for use in the .redraw() loop
                particleSystem = system;

                // inform the system of the screen dimensions so it can map coords for us.
                // if the canvas is ever resized, screenSize should be called again with
                // the new dimensions
                particleSystem.screenSize(canvas.width, canvas.height);
                particleSystem.screenPadding(80); // leave an extra 80px of whitespace per side

                // set up some event handlers to allow for node-dragging
                that.initMouseHandling();
            },

            redraw:function(){
                //
                // redraw will be called repeatedly during the run whenever the node positions
                // change. the new positions for the nodes can be accessed by looking at the
                // .p attribute of a given node. however the p.x & p.y values are in the coordinates
                // of the particle system rather than the screen. you can either map them to
                // the screen yourself, or use the convenience iterators .eachNode (and .eachEdge)
                // which allow you to step through the actual node objects but also pass an
                // x,y point in the screen's coordinate system
                //
                ctx.fillStyle = "white";//белым цветом
                ctx.fillRect(0,0, canvas.width, canvas.height);//закрашиваем всю область

                particleSystem.eachEdge(//отрисуем каждую грань
                    function(edge, pt1, pt2){//будем работать с гранями и точками её начала и конца
                    // edge: {source:Node, target:Node, length:#, data:{}}
                    // pt1:  {x:#, y:#}  source position in screen coords
                    // pt2:  {x:#, y:#}  target position in screen coords

                    // draw a line from pt1 to pt2
                    ctx.strokeStyle = "rgba(0,0,0, .333)";//грани будут чёрным цветом с некой прозрачностью
                    ctx.lineWidth = 1;
                    ctx.beginPath();//начинаем рисовать
                    ctx.moveTo(pt1.x, pt1.y);//от точки один
                    ctx.lineTo(pt2.x, pt2.y);//до точки два
                    ctx.stroke();
                });

                particleSystem.eachNode(//теперь каждую вершину
                    function(node, pt){//получаем вершину и точку где она
                    // node: {mass:#, p:{x,y}, name:"", data:{}}
                    // pt:   {x:#, y:#}  node position in screen coords

                    // draw a rectangle centered at pt
                    var w = 10;//ширина квадрата
                    //ctx.fillStyle = (node.data.alone) ? "orange" : "black";
                    ctx.fillStyle = "black";//с его цветом понятно
                    ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w);//рисуем
                    ctx.fillStyle = "black"; //цвет для шрифта
                    ctx.font = 'italic 13px sans-serif'; //шрифт
                    ctx.fillText (node.name, pt.x+8, pt.y+8); //пишем имя у каждой точки
                })
            },

            initMouseHandling:function(){//события с мышью
                // no-nonsense drag and drop (thanks springy.js)
                var dragged = null;//вершина которую перемещают

                // set up a handler object that will initially listen for mousedowns then
                // for moves and mouseups while dragging
                var handler = {
                    clicked:function(e){//нажали
                        var pos = $(canvas).offset();//получаем позицию canvas
                        _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);//и позицию нажатия кнопки относительно canvas
                        dragged = particleSystem.nearest(_mouseP);//определяем ближайшую вершину к нажатию

                        if (dragged && dragged.node !== null){
                            // while we're dragging, don't let physics move the node
                            dragged.node.fixed = true;//фиксируем её
                        }

                        $(canvas).bind('mousemove', handler.dragged);//слушаем события перемещения мыши
                        $(window).bind('mouseup', handler.dropped);//и отпускания кнопки

                        return false;
                    },
                    dragged:function(e){//перетаскиваем вершину
                        var pos = $(canvas).offset();
                        var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);

                        if (dragged && dragged.node !== null){
                            var p = particleSystem.fromScreen(s);
                            dragged.node.p = p; //тянем вершину за нажатой мышью
                        }
                        return false;
                    },

                    dropped:function(e){//отпустили
                        if (dragged===null || dragged.node===undefined) return;//если не перемещали, то уходим
                        if (dragged.node !== null) dragged.node.fixed = false;//если перемещали - отпускаем
                        dragged.node.tempMass = 1000;
                        dragged = null;//очищаем
                        $(canvas).unbind('mousemove', handler.dragged);//перестаём слушать события
                        $(window).unbind('mouseup', handler.dropped);
                        _mouseP = null;
                        return false
                    }
                };

                // слушаем события нажатия мыши
                $(canvas).mousedown(handler.clicked);

            }

        };
        return that;
    };

    $(document).ready(function(){
        var sys = arbor.ParticleSystem(1000, 600, 0.5); // create the system with sensible repulsion/stiffness/friction
        sys.parameters({gravity:true}); // use center-gravity to make the graph settle nicely (ymmv)
        sys.renderer = Renderer("#viewport"); // our newly created renderer will have its .init() method called shortly by sys...

        // add some nodes to the graph and watch it go...
        //sys.addEdge('a','b')
        //sys.addEdge('b','c')
        //sys.addEdge('a','c')
        //sys.addEdge('a','d')
        //sys.addEdge('a','e')
        //sys.addNode('f', {alone:true, mass:.25})

        // or, equivalently:

        // sys.graft({
        //   nodes:{
        //     f:{alone:true, mass:.25}
        //   },
        //   edges:{
        //     a:{ b:{},
        //         c:{},
        //         d:{},
        //         e:{}
        //     }
        //   }
        // })

        sys.graft({
            "nodes": [
                {"name": "node_1",
                    "id": "1"},
                {"name": "node_2",
                    "id": "2"},
                {"name": "node_3",
                    "id": "3"},
                {"name": "node_4",
                    "id": "4"},
                {"name": "node_5",
                    "id": "5"},
                {"name": "node_6",
                    "id": "6"},
                {"name": "node_7",
                    "id": "7"},
                {"name": "node_8",
                    "id": "8"},
                {"name": "node_9",
                    "id": "9"},
                {"name": "node_10",
                    "id": "10"}
            ],
            "edges": [
                {"src": "1", "dest": "2"},
                {"src": "5", "dest": "3"},
                {"src": "8", "dest": "7"},
                {"src": "1", "dest": "4"},
                {"src": "7", "dest": "5"},
                {"src": "3", "dest": "9"},
                {"src": "2", "dest": "4"},
                {"src": "6", "dest": "5"},
                {"src": "9", "dest": "1"},
                {"src": "10", "dest": "2"},
                {"src": "1", "dest": "10"}
            ]
        });

        //var nodes = require('./nodes.json');
        //console.warn('', nodes);
        //$.getJSON(nodes, //получаем с сервера файл с данными
        //    function(data){
        //        $.each(data.nodes, function(i,node){
        //            sys.addNode(node.name); //добавляем вершину
        //        });
        //
        //        $.each(data.edges, function(i,edge){
        //            sys.addEdge(sys.getNode(edge.src),sys.getNode(edge.dest)); //добавляем грань
        //        });
        //    });

    })

})(this.jQuery);