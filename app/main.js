//import jQuery from '../node_modules/jquery/dist/jquery.min'
//const jQuery = require('../node_modules/jquery/dist/jquery.min');
(function($){

    var Renderer = function(canvas){
        var canvas = $(canvas).get(0);
        var ctx = canvas.getContext("2d");
        var particleSystem;

        var that = {
            init:function(system){
                particleSystem = system;
                particleSystem.screenSize(canvas.width, canvas.height);
                particleSystem.screenPadding(80);
                that.initMouseHandling();
            },
            redraw:function(){
                ctx.fillStyle = "white";//белым цветом
                ctx.fillRect(0,0, canvas.width, canvas.height);//закрашиваем всю область

                particleSystem.eachEdge(//отрисуем каждую грань
                    function(edge, pt1, pt2){//будем работать с гранями и точками её начала и конца где edge: {source:Node, target:Node, length:#, data:{}}
                    //console.warn('EDGE', edge);
                    ctx.strokeStyle = "rgba(0,0,0, .333)";//грани будут чёрным цветом с некой прозрачностью
                    ctx.lineWidth = 1;
                    ctx.beginPath();//начинаем рисовать
                    ctx.moveTo(pt1.x, pt1.y);//от точки один
                    ctx.lineTo(pt2.x, pt2.y);//до точки два
                    ctx.stroke();
                });

                particleSystem.eachNode(//теперь каждую вершину
                    function(node, pt){//получаем вершину и точку где она где node: {mass:#, p:{x,y}, name:"", data:{}}
                    var w = 10;//ширина квадрата
                    //ctx.fillStyle = (node.data.alone) ? "orange" : "black";
                    ctx.fillStyle = "blue";
                    ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w);//рисуем
                    ctx.fillStyle = "black"; //цвет для шрифта
                    ctx.font = 'italic 13px sans-serif'; //шрифт
                    ctx.fillText (node.data.firstName, pt.x+8, pt.y+8); //пишем имя у каждой точки
                })
            },

            initMouseHandling:function(){//события с мышью no-nonsense drag and drop (thanks springy.js)
                var dragged = null;//вершина которую перемещают
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
                        alert('Node indormation:'
                            + '\r\n First Name: '  + dragged.node.data.firstName
                            + '\r\n Last Name: ' + dragged.node.data.lastName
                            + '\r\n Role: ' + dragged.node.data.role
                            + '\r\n Company: ' + dragged.node.data.company
                            + '\r\n Email: ' + dragged.node.data.email
                            + '\r\n Phone: ' + dragged.node.data.phone
                            + '\r\n Score: ' + dragged.node.data.score);
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
                {
                    //"name": "node_1",
                    "id": "0",
                    "firstName": "Adele",
                    "lastName": "Hargarden",
                    "role": "Ingeneer",
                    "company": "SS",
                    "email": "Adele@gmail.com",
                    "phone": "0501234569",
                    "score": "25"
                },
                {
                    //"name": "node_2",
                    "id": "1",
                    "firstName": "John",
                    "lastName": "Smith",
                    "role": "SEO",
                    "company": "SS",
                    "email": "John@gmail.com",
                    "phone": "0501234569",
                    "score": "-25"
                },
                {
                    //"name": "node_3",
                    "id": "2",
                    "firstName": "Michael",
                    "lastName": "Bergner",
                    "role": "PM",
                    "company": "SS",
                    "email": "Michael@gmail.com",
                    "phone": "0501234569",
                    "score": "50"
                },
                {
                    //"name": "node_4",
                    "id": "3",
                    "firstName": "John",
                    "lastName": "Smith",
                    "role": "Ingeneer",
                    "company": "SS",
                    "email": "John@gmail.com",
                    "phone": "0501234569",
                    "score": "0"
                },
                {
                    //"name": "node_5",
                    "id": "4",
                    "firstName": "test5",
                    "lastName": "test5",
                    "role": "test5",
                    "company": "test5",
                    "email": "test@gmail.com",
                    "phone": "0501234569",
                    "score": "56"
                },
                {
                    //"name": "node_6",
                    "id": "5",
                    "firstName": "test6",
                    "lastName": "test6",
                    "role": "test6",
                    "company": "test6",
                    "email": "test@gmail.com",
                    "phone": "0501234569",
                    "score": "56"
                },
                {
                    //"name": "node_7",
                    "id": "6",
                    "firstName": "test7",
                    "lastName": "test7",
                    "role": "test7",
                    "company": "test7",
                    "email": "test@gmail.com",
                    "phone": "0501234569",
                    "score": "56"
                },
                {
                    //"name": "node_8",
                    "id": "7",
                    "firstName": "test8",
                    "lastName": "test8",
                    "role": "test8",
                    "company": "test8",
                    "email": "test@gmail.com",
                    "phone": "0501234569",
                    "score": "56"
                },
                {
                    //"name": "node_9",
                    "id": "8",
                    "firstName": "test9",
                    "lastName": "test9",
                    "role": "test9",
                    "company": "test9",
                    "email": "test@gmail.com",
                    "phone": "0501234569",
                    "score": "56"
                },
                {
                    //"name": "node_10",
                    "id": "9",
                    "firstName": "test10",
                    "lastName": "test10",
                    "role": "test10",
                    "company": "test10",
                    "email": "test@gmail.com",
                    "phone": "0501234569",
                    "score": "56"
                }
            ]
            //"edges": [
            //    {"src": "node_3", "dest": "node_2"},
            //    {"src": "node_5", "dest": "node_3"},
            //    {"src": "node_8", "dest": "node_7"},
            //    {"src": "node_1", "dest": "node_4"},
            //    {"src": "node_7", "dest": "node_5"},
            //    {"src": "node_3", "dest": "node_9"},
            //    {"src": "node_2", "dest": "node_4"},
            //    {"src": "node_6", "dest": "node_5"},
            //    {"src": "node_9", "dest": "node_1"},
            //    {"src": "node_10", "dest": "node_2"},
            //    {"source": "node_1", "target": "node_10"}
            //]
        });


        //var nodes = require('./nodes.json');
        //console.warn('nodes', nodes);
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
        sys.addEdge('2','1');
        sys.addEdge('4','2');
        sys.addEdge('7','6');
        sys.addEdge('0','3');
        sys.addEdge('6','4');
        sys.addEdge('6','4');
        sys.addEdge('2','8');
        sys.addEdge('1','3');
        sys.addEdge('5','4');
        sys.addEdge('8','0');
        sys.addEdge('9','1');

    })

})(window.jQuery);