{
    init: function(elevators, floors) {
        for(let elevator of elevators){
            elevator.on("idle", function(){
                if(elevator.getPressedFloors().length > 0) {
                    elevator.goToFloor(elevator.getPressedFloors()[0]);
                }else{
                    floors.forEach(function (floor) {
                        if(elevator.loadFactor() === 0 ) {
                            floor.on('up_button_pressed down_button_pressed', function () {
                                elevator.on("passing_floor", function(floorNum, direction) { 
                                    if(direction === "up" && floorNum === floor.floorNum()){
                                        elevator.goToFloor(floorNum, true)
                                    }else if(direction === "down" && floorNum === floor.floorNum()){
                                        elevator.goToFloor(floorNum, true)
                                    }
                                    else{
                                        elevator.goToFloor(floor.floorNum())
                                    }
                                });
                            });
                        }else{
                            elevator.goToFloor(floor)
                        }
                    })
                }
            });
        }
    },
        update: function(dt, elevators, floors) {
        }
}


//----------Second solution----------

{
    init: function(elevators, floors) {
        let pressFromFloor=[];
        let passingFloor=[]
        let matchingPassAndPressFloor= []
        let upOrDown;

        let createWaitList = (floor, elevator, ) =>{
            floor.on('up_button_pressed down_button_pressed', function () {
                pressFromFloor.push(floor.floorNum());
                elevator.on("passing_floor", function(floorNum, direction) {
                    passingFloor.push(floorNum)
                    upOrDown = direction
                    //find the matching passing floor and the floor in waitlist
                    matchingPassAndPressFloor = passingFloor.filter(element => pressFromFloor.includes(element));
                });
            });
        }


        elevators.forEach((elevator)=>{
            elevator.on("idle", function() {
                if(elevator.loadFactor() > 0) {  
                    console.log("ele is NOT empty",elevator.loadFactor(), "pressFromFloor.length",pressFromFloor.length)
                    let goToList = [... new Set(elevator.getPressedFloors())];
                    if(elevator.loadFactor() < 1 && pressFromFloor) {
                        floors.forEach((floor)=>{
                            createWaitList(floor, elevator)
                        })
                        let combineAllList = matchingPassAndPressFloor.concat(pressFromFloor, goToList)
                        //delete duplicate
                        let  waitList= [... new Set(combineAllList)]
                        //console.log("pressFromFloor", [... new Set(pressFromFloor)])
                        //console.log("passingFloor", [... new Set(passingFloor)])
                        //console.log("matchingPassAndPressFloor", [... new Set(passingFloor.filter(element => pressFromFloor.includes(element)))])
                        //console.log("goToList",goToList)
                        //console.log("waitList",waitList)

                        if(upOrDown === "up" ){
                            console.log(upOrDown,waitList.sort((a, b) =>  b - a))
                            goToList.sort((a, b) =>  b - a).forEach(x => elevator.goToFloor(x));
                        }
                        else if( upOrDown === "down"){
                            console.log(upOrDown, waitList.sort((a, b) => a - b))
                            goToList.sort((a, b) => a - b).forEach(x => elevator.goToFloor(x));
                        }else{
                            console.log("not go up or down")
                            waitList.forEach(x => elevator.goToFloor(x))
                        }
                    }
                    console.log("-------------------------")
                }
                //Ele emplty
                else{
                    console.log("ele empty",elevator.loadFactor(), "pressFromFloor.length",pressFromFloor.length)
                    if(pressFromFloor.length > 0) {
                        floors.forEach((floor)=>{
                            createWaitList(floor, elevator)
                        })
                        let combineAllList = matchingPassAndPressFloor.concat(pressFromFloor)
                        //delete duplicate
                        let waitList= [... new Set(combineAllList)]
                        if(passingFloor.length > 0 && passingFloor.filter(element => pressFromFloor.includes(element))){
                            console.log("passingFloor is true",passingFloor, waitList)
                            waitList.map(x => elevator.goToFloor(x))
                        }else{
                            console.log("passingFloor is fault",passingFloor)
                            pressFromFloor.map(x => elevator.goToFloor(x))
                        }
                    }else{
                        console.log("no one press from floor")
                        elevator.goToFloor(0)
                    }
                    console.log("-------------------------")
                }
            });
        })
    },
        update: function(dt, elevators, floors) {
        }
}