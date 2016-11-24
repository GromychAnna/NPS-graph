//import styles from './contacts-table.scss'
let sys;
export default ngModule => {
    ngModule.directive('stakeholdersGraph', stakeholdersGraphFn);

    function renderer (canvas, data){
        var ctx = canvas.getContext("2d");
        var particleSystem;
        var that = {
            init: (system) => {
                particleSystem = system;
                particleSystem.screenSize(canvas.width, canvas.height);
                particleSystem.screenPadding(80);
                that.initMouseHandling();
            },
            redraw: () => {
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
                    (node, pt) => {                                                                 //получаем вершину и точку где она где node: {mass:#, p:{x,y}, name:"", data:{}}
                        const w = 13;                                                                     //ширина квадрата //ctx.fillStyle = (node.data.alone) ? "orange" : "black";
                        ctx.fillStyle = node.data.score > 0 ? "#32CD32" : "#DC143C";
                        if (node.data.score == 0) {
                            ctx.fillStyle = "#696969";
                        }
                        ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w);                                          //рисуем
                        ctx.fillStyle = "black";                                                        //цвет для шрифта

                        ctx.font = 'italic 13px sans-serif';                                            //шрифт
                        ctx.fillText (`${node.data.firstName}  ${node.data.score}`, pt.x+8, pt.y+8);                             //пишем имя у каждой точки
                    })
            },

            initMouseHandling: () => {                                                               //события с мышью no-nonsense drag and drop (thanks springy.js)
                let dragged = null;                                                                     //вершина которую перемещают
                let handler = {
                    clicked: (e) => {                                                                //нажали
                        //var pos = canvas.offset();                                                      //получаем позицию canvas
                        const posLeft = canvas.offsetLeft;
                        const posTop = canvas.offsetTop;
                        const _mouseP = arbor.Point(e.pageX-posLeft, e.pageY-posTop);                       //и позицию нажатия кнопки относительно canvas
                        dragged = particleSystem.nearest(_mouseP);                                      //определяем ближайшую вершину к нажатию

                        if (dragged && dragged.node !== null){                                          // while we're dragging, don't let physics move the node
                            dragged.node.fixed = true;                                                  //фиксируем её
                        }
                        canvas.addEventListener('mousemove', handler.dragged);                                      //слушаем события перемещения мыши
                        window.addEventListener('mouseup', handler.dropped);                                        //и отпускания кнопки

                        return false;
                    },
                    dragged: (e) => {                                                                //перетаскиваем вершину
                        //var pos = canvas.offset();
                        const posLeft = canvas.offsetLeft;
                        const posTop = canvas.offsetTop;
                        const s = arbor.Point(e.pageX-posLeft, e.pageY-posTop);

                        if (dragged && dragged.node !== null){
                            let p = particleSystem.fromScreen(s);
                            dragged.node.p = p;                                                         //тянем вершину за нажатой мышью
                        }
                        return false;
                    },

                    dropped: (e) => {//отпустили
                        if (dragged===null || dragged.node===undefined) return;                         //если не перемещали, то уходим
                        if (dragged.node !== null) dragged.node.fixed = false;                          //если перемещали - отпускаем
                        dragged.node.tempMass = 1000;

                        const modal = document.getElementById('myModal');
                        const btn = document.getElementById("myBtn");
                        const span = document.getElementsByClassName("close")[0];
                        btn.onclick = () => {
                            modal.style.display = "block";
                        };
                        span.onclick = () => {
                            modal.style.display = "none";
                        };
                        window.onclick = (event) => {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        };
                        const showModal = document.getElementById('myBtn');
                        showModal.click();

                        const firstName = document.getElementById('firstName');
                        firstName.innerHTML = firstName.innerHTML + dragged.node.data.firstName;

                        const lastName = document.getElementById('lastName');
                        lastName.innerHTML = lastName.innerHTML + dragged.node.data.lastName;

                        const role = document.getElementById('role');
                        role.innerHTML = role.innerHTML + dragged.node.data.role;

                        const company = document.getElementById('company');
                        company.innerHTML = company.innerHTML + dragged.node.data.company;

                        const email = document.getElementById('email');
                        email.innerHTML = email.innerHTML + dragged.node.data.email;

                        const phone = document.getElementById('phone');
                        phone.innerHTML = phone.innerHTML + dragged.node.data.phone;

                        const score = document.getElementById('score');
                        score.innerHTML = score.innerHTML + dragged.node.data.score;


                        dragged = null;                                                                 //очищаем
                        canvas.addEventListener('mousemove', handler.dragged);                          //слушаем события перемещения мыши
                        window.addEventListener('mouseup', handler.dropped);
                        const _mouseP = null;
                        return false
                    },

                    ondblclick : (e) => {
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
    }

    function drawGraph (element, stakeholders, edges) {
        sys = arbor.ParticleSystem(1000, 600, 0.5);                                                 // create-event the system with sensible repulsion/stiffness/friction
        sys.parameters({gravity:true});                                                                 // use center-gravity to make the graph settle nicely (ymmv)
        sys.renderer = renderer(element, {stakeholders, edges});                                                         // our newly created renderer will have its .init() method called shortly by sys...

        _.forEach(stakeholders, (node) => {
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

        _.forEach(edges, (edge) => {
            sys.addEdge(edge.src,edge.dest);                                                            //добавляем грань
        });

    }

    function stakeholdersGraphFn() {
        return {
            restrict: 'AC',
            scope: {
                stakeholders: '=',
                edges: '=',
                edgeTypes: '='
            },
            link: (scope, element, attrs) => {
                //debugger
                drawGraph(element[0],scope.stakeholders, scope.edges);
                scope.$watch(
                    ()=> scope.stakeholder,
                    (value) => {
                        sys.renderer = renderer(element[0], {stakeholders: value, edges: scope.edges});
                    }
                );

                scope.$watch(
                    ()=> scope.edges,
                    (value) => {
                        sys.renderer = renderer(element[0], {stakeholders: scope.stakeholders, edges: value});
                    }
                );

            }
        }
    }
}
