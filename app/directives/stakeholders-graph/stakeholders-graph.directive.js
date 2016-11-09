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
                    function(edge, pt1, pt2){                                                           //будем работать с гранями и точками её начала и конца где edge: {source:Node, target:Node, length:#, data:{}}//console.warn('EDGE', data);
                        ctx.strokeStyle = "rgba(0,0,0, .333)";                                          //грани будут чёрным цветом с некой прозрачностью
                        ctx.lineWidth = 1;
                        ctx.beginPath();//начинаем рисовать
                        ctx.moveTo(pt1.x, pt1.y);//от точки один
                        ctx.lineTo(pt2.x, pt2.y);//до точки два
                        ctx.stroke();
                    });

                particleSystem.eachNode(                                                                //теперь каждую вершину
                    function(node, pt){                                                                 //получаем вершину и точку где она где node: {mass:#, p:{x,y}, name:"", data:{}}
                        var w = 13;                                                                     //ширина квадрата //ctx.fillStyle = (node.data.alone) ? "orange" : "black";
                        ctx.fillStyle = "#337ab7";
                        ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w);                                          //рисуем
                        ctx.fillStyle = "black";                                                        //цвет для шрифта

                        ctx.font = 'italic 13px sans-serif';                                            //шрифт
                        ctx.fillText (node.data.firstName, pt.x+8, pt.y+8);                             //пишем имя у каждой точки
                    })
            },

            initMouseHandling:function(){                                                               //события с мышью no-nonsense drag and drop (thanks springy.js)
                var dragged = null;                                                                     //вершина которую перемещают
                var handler = {
                    clicked:function(e){                                                                //нажали
                        //var pos = canvas.offset();                                                      //получаем позицию canvas
                        var posLeft = canvas.offsetLeft;
                        var posTop = canvas.offsetTop;
                        var _mouseP = arbor.Point(e.pageX-posLeft, e.pageY-posTop);                       //и позицию нажатия кнопки относительно canvas
                        dragged = particleSystem.nearest(_mouseP);                                      //определяем ближайшую вершину к нажатию

                        if (dragged && dragged.node !== null){                                          // while we're dragging, don't let physics move the node
                            dragged.node.fixed = true;                                                  //фиксируем её
                        }
                        canvas.addEventListener('mousemove', handler.dragged);                                      //слушаем события перемещения мыши
                        window.addEventListener('mouseup', handler.dropped);                                        //и отпускания кнопки

                        return false;
                    },
                    dragged:function(e){                                                                //перетаскиваем вершину
                        //var pos = canvas.offset();
                        var posLeft = canvas.offsetLeft;
                        var posTop = canvas.offsetTop;
                        var s = arbor.Point(e.pageX-posLeft, e.pageY-posTop);

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

                        var modal = document.getElementById('myModal');
                        var btn = document.getElementById("myBtn");
                        var span = document.getElementsByClassName("close")[0];
                        btn.onclick = function() {
                            modal.style.display = "block";
                        };
                        span.onclick = function() {
                            modal.style.display = "none";
                        };
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        };
                        var showModal = document.getElementById('myBtn');
                        showModal.click();

                        var firstName = document.getElementById('firstName');
                        firstName.innerHTML = firstName.innerHTML + dragged.node.data.firstName;

                        var lastName = document.getElementById('lastName');
                        lastName.innerHTML = lastName.innerHTML + dragged.node.data.lastName;

                        var role = document.getElementById('role');
                        role.innerHTML = role.innerHTML + dragged.node.data.role;

                        var company = document.getElementById('company');
                        company.innerHTML = company.innerHTML + dragged.node.data.company;

                        var email = document.getElementById('email');
                        email.innerHTML = email.innerHTML + dragged.node.data.email;

                        var phone = document.getElementById('phone');
                        phone.innerHTML = phone.innerHTML + dragged.node.data.phone;

                        var score = document.getElementById('score');
                        score.innerHTML = score.innerHTML + dragged.node.data.score;


                        dragged = null;                                                                 //очищаем
                        canvas.addEventListener('mousemove', handler.dragged);                          //слушаем события перемещения мыши
                        window.addEventListener('mouseup', handler.dropped);
                        var _mouseP = null;
                        return false
                    },

                    ondblclick :function(e){
                        alert("Hello");
                        canvas.addEventListener('ondblclick', handler.dragged);                         //слушаем события перемещения мыши
                        window.addEventListener('ondblclick', handler.dropped);
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

        _.forEach(data.edges, function(edge) {
            sys.addEdge(edge.src,edge.dest);                                                            //добавляем грань
        });

    }

    function stakeholdersGraphFn() {
        return {
            restrict: 'AC',
            scope: {},
            controllerAs: 'ctrl',
            controller: require('./stakeholders-graph.controller'),
            link: function(scope, element, attrs) {
                drawGraph(element[0], scope);
            }
        }
    }
}
