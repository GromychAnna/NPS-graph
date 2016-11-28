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


                let nodeBoxes = {};

                particleSystem.eachNode(                                                                //теперь каждую вершину
                    (node, pt) => {                                                                 //получаем вершину и точку где она где node: {mass:#, p:{x,y}, name:"", data:{}}
                        const w = 13;                                                                     //ширина квадрата //ctx.fillStyle = (node.data.alone) ? "orange" : "black";
                        ctx.fillStyle = node.data.score > 0 ? "#2E8B57" : "#DC143C";
                        if (node.data.score == 0) {
                            ctx.fillStyle = "#696969";
                        }
                        nodeBoxes[node.name] = [pt.x-w/2, pt.y-11, w, 22];
                        ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w);                                          //рисуем
                        ctx.fillStyle = "black";                                                        //цвет для шрифта

                        ctx.font = 'italic 13px sans-serif';                                            //шрифт
                        ctx.fillText (`${node.data.firstName}  ${node.data.score}`, pt.x+8, pt.y+8);                             //пишем имя у каждой точки
                    });

                particleSystem.eachEdge(                                                                //отрисуем каждую грань
                    function(edge, pt1, pt2){                                                           //будем работать с гранями и точками её начала и конца где edge: {source:Node, target:Node, length:#, data:{}}//console.warn('EDGE', data);
                        const weight = 1;
                        let color = "#DCDCDC";
                        if (!color || (` ${color}`).match(/^[ \t]*$/)) { color = null};

                        // find the start point
                        let tail = intersect_line_box(pt1, pt2, nodeBoxes[edge.source.name]);
                        let head = intersect_line_box(tail, pt2, nodeBoxes[edge.target.name]);

                        ctx.save();
                        ctx.beginPath();
                        ctx.lineWidth = (!isNaN(weight)) ? parseFloat(weight) : 1;
                        ctx.strokeStyle = (color) ? color : "#cccccc";
                        ctx.fillStyle = null;

                        ctx.moveTo(tail.x, tail.y);
                        ctx.lineTo(head.x, head.y);
                        ctx.stroke();
                        ctx.restore();

                        // draw an arrowhead if this is a -> style edge
                        if (edge.data === "Reports to"){
                            ctx.save();
                            let color = "#9BCD9B";
                            // move to the head position of the edge we just drew
                            let wt = !isNaN(weight) ? parseFloat(weight) : 1;
                            let arrowLength = 16 + wt;
                            let arrowWidth = 4 + wt;
                            ctx.translate(head.x, head.y);
                            ctx.rotate(Math.atan2(head.y - tail.y, head.x - tail.x));

                            // delete some of the edge that's already there (so the point isn't hidden)
                            ctx.clearRect(-arrowLength/2,-wt/2, arrowLength/2,wt);

                            // draw the chevron
                            ctx.beginPath();
                            ctx.fillStyle = color;
                            ctx.strokeStyle = color;
                            ctx.moveTo(-arrowLength, arrowWidth);
                            ctx.lineTo(0, 0);
                            ctx.lineTo(-arrowLength, -arrowWidth);
                            ctx.lineTo(-arrowLength * 0.8, -0);
                            //ctx.closePath();
                            ctx.fill();
                            //ctx.strokeStyle="#DC143C";
                            ctx.stroke();
                            ctx.restore()
                        }
                    });


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
        // helpers for figuring out where to draw arrows (thanks springy.js)
        function intersect_line_line  (p1, p2, p3, p4) {
            let denom = ((p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y));
            if (denom === 0) return false; // lines are parallel
            let ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x)) / denom;
            let ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x)) / denom;

            if (ua < 0 || ua > 1 || ub < 0 || ub > 1)  return false;
            return arbor.Point(p1.x + ua * (p2.x - p1.x), p1.y + ua * (p2.y - p1.y));
        }

        function intersect_line_box (p1, p2, boxTuple) {
            let p3 = {x:boxTuple[0], y:boxTuple[1]},
                w = boxTuple[2],
                h = boxTuple[3];

            let tl = {x: p3.x, y: p3.y};
            let tr = {x: p3.x + w, y: p3.y};
            let bl = {x: p3.x, y: p3.y + h};
            let br = {x: p3.x + w, y: p3.y + h};

            return intersect_line_line(p1, p2, tl, tr) ||
                intersect_line_line(p1, p2, tr, br) ||
                intersect_line_line(p1, p2, br, bl) ||
                intersect_line_line(p1, p2, bl, tl) ||
                false
        }

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
            sys.addEdge(edge.src,edge.dest,edge.edgeType);                                                            //добавляем грань
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
                const reportsEdges = scope.edges;
                const peerEdges = scope.edges;

                drawGraph(element[0],scope.stakeholders, scope.edges);
                scope.$watch(
                    ()=> scope.stakeholder,
                    (value) => {
                        //drawGraph(element[0],scope.stakeholders, scope.edges);
                        sys.renderer = renderer(element[0], {stakeholders: value, edges: scope.edges});
                    }
                );

                scope.$watch(
                    ()=> scope.edges,
                    (value) => {
                        //drawGraph(element[0],scope.stakeholders, scope.edges);
                        sys.renderer = renderer(element[0], {stakeholders: scope.stakeholders, edges: value});
                    }
                );

            }
        }
    }
}
