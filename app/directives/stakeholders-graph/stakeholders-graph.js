//import styles from './contacts-table.scss'

export default ngModule => {
    ngModule.directive('stakeholdersGraph', stakeholdersGraphFn);

    function renderer (canvas, data){
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
                ctx.fillStyle = "white";                                                                //белым цветом
                ctx.fillRect(0,0, canvas.width, canvas.height);                                         //закрашиваем всю область

                particleSystem.eachEdge(                                                                //отрисуем каждую грань
                    function(edge, pt1, pt2){//будем работать с гранями и точками её начала и конца где edge: {source:Node, target:Node, length:#, data:{}}//console.warn('EDGE', data);
                        //console.warn('EDGE', edge);
                        ctx.strokeStyle = "rgba(0,0,0, .333)";//грани будут чёрным цветом с некой прозрачностью
                        ctx.lineWidth = 1;
                        ctx.beginPath();//начинаем рисовать
                        ctx.moveTo(pt1.x, pt1.y);//от точки один
                        ctx.lineTo(pt2.x, pt2.y);//до точки два
                        ctx.stroke();
                    });

                particleSystem.eachNode(                                                                //теперь каждую вершину
                    function(node, pt){                                                                 //получаем вершину и точку где она где node: {mass:#, p:{x,y}, name:"", data:{}}
                        var w = 10;                                                                     //ширина квадрата //ctx.fillStyle = (node.data.alone) ? "orange" : "black";
                        ctx.fillStyle = "blue";
                        ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w);                                          //рисуем
                        ctx.fillStyle = "black";                                                        //цвет для шрифта
                        ctx.font = 'italic 13px sans-serif';                                            //шрифт
                        ctx.fillText (node.data.firstName, pt.x+8, pt.y+8);                                       //пишем имя у каждой точки
                    })
            },

            initMouseHandling:function(){                                                               //события с мышью no-nonsense drag and drop (thanks springy.js)
                var dragged = null;                                                                     //вершина которую перемещают
                var handler = {
                    clicked:function(e){                                                                //нажали
                        var pos = canvas.offset();                                                      //получаем позицию canvas
                        _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);                       //и позицию нажатия кнопки относительно canvas
                        dragged = particleSystem.nearest(_mouseP);                                      //определяем ближайшую вершину к нажатию

                        if (dragged && dragged.node !== null){                                          // while we're dragging, don't let physics move the node
                            dragged.node.fixed = true;                                                  //фиксируем её
                        }
                        canvas.bind('mousemove', handler.dragged);                                      //слушаем события перемещения мыши
                        window.bind('mouseup', handler.dropped);                                        //и отпускания кнопки

                        return false;
                    },
                    dragged:function(e){                                                                //перетаскиваем вершину
                        var pos = canvas.offset();
                        var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);

                        if (dragged && dragged.node !== null){
                            var p = particleSystem.fromScreen(s);
                            dragged.node.p = p;                                                         //тянем вершину за нажатой мышью
                        }
                        return false;
                    },

                    dropped:function(e){//отпустили
                        if (dragged===null || dragged.node===undefined) return;                         //если не перемещали, то уходим
                        if (dragged.node !== null) dragged.node.fixed = false;                          //если перемещали - отпускаем
                        dragged.node.tempMass = 1000;
                        alert('Node indormation:'
                            + '\r\n First Name: '  + dragged.node.data.firstName
                            + '\r\n Last Name: ' + dragged.node.data.lastName
                            + '\r\n Role: ' + dragged.node.data.role
                            + '\r\n Company: ' + dragged.node.data.company
                            + '\r\n Email: ' + dragged.node.data.email
                            + '\r\n Phone: ' + dragged.node.data.phone
                            + '\r\n Score: ' + dragged.node.data.score);
                        dragged = null;                                                                 //очищаем
                        canvas.unbind('mousemove', handler.dragged);                                    //перестаём слушать события
                        window.unbind('mouseup', handler.dropped);
                        _mouseP = null;
                        return false
                    }
                };
                                                                                                        // слушаем события нажатия мыши
                canvas.addEventListener("mousedown", handler.clicked);
            }
        };
        return that;
    };

    function drawGraph (element, data) {
        console.warn('data', data);
        var sys = arbor.ParticleSystem(1000, 600, 0.5);                                                 // create the system with sensible repulsion/stiffness/friction
        sys.parameters({gravity:true});                                                                 // use center-gravity to make the graph settle nicely (ymmv)
        sys.renderer = renderer(element, data);                                                         // our newly created renderer will have its .init() method called shortly by sys...

        _.forEach(data.nodes, function(node) {
            sys.addNode(node.id,
                {
                    'name': node.name,
                    'id': node.id,
                    'firstName': node.firstName,
                    'lastName': node.lastName,
                    'role': node.role,
                    'company': node.company,
                    'email': node.email,
                    'phone': node.phone,
                    'score': node.score
                });
        });

        console.warn('data.edges', data.edges);
        _.forEach(data.edges, function(edge) {
            console.warn('edge', edge);
            sys.addEdge(edge.src,edge.dest); //добавляем грань
        });

    }

    function stakeholdersGraphFn() {
        return {
            restrict: 'AC',
            scope: {},
            controller: function ($scope, $http, dataManipulation) {
                const mockedNodes = dataManipulation.peoples;
                const mockedEdges = dataManipulation.edges;
                const edgesStorage = localStorage.getItem("edges");
                const nodesStrorage = localStorage.getItem("nodes");
                console.warn('GGGnodesGGG', nodesStrorage);
                console.warn('GGGedgesGGG', edgesStorage);
                $scope.nodes =  nodesStrorage ? JSON.parse(nodesStrorage) : mockedNodes;
                $scope.edges =edgesStorage ? JSON.parse(edgesStorage) : mockedEdges;
            },
            link: function(scope, element, attrs) {
                drawGraph(element[0], scope);
            }
        }
    }
}
