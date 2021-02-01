{
    init: function(elevators, floors) {
        let pressFromFloor=[];
        let passingFloor=[]
        let matchingPassAndPressFloor= []
        let upOrDown;
        let floorPass;
        let floorPress;

        let createWaitList = (floor, elevator, ) =>{
            floor.on('up_button_pressed down_button_pressed', function () {
                pressFromFloor.push(floor.floorNum());
                floorPress= floor.floorNum()
                elevator.on("passing_floor", function(floorNum, direction) {
                    passingFloor.push(floorNum)
                    floorPass = floorNum
                    upOrDown = direction
                    //find the matching passing floor and the floor in waitlist
                    matchingPassAndPressFloor = passingFloor.filter(element => pressFromFloor.includes(element));
                });
            });
        }


        elevators.forEach((elevator)=>{
            elevator.on("idle", function() {
                if(elevator.loadFactor() === 0) {  
                    
                    console.log("ele empty",elevator.loadFactor())
                    floors.forEach((floor)=>{
                        createWaitList(floor, elevator)
                    })
                    matchingPassAndPressFloor.concat(pressFromFloor)
                    //delete duplicate
                    let waitList = [... new Set(matchingPassAndPressFloor)]
                    if(passingFloor.length > 0 && elevator.loadFactor() === 0 ){
                        console.log(elevator.loadFactor())
                        console.log("elevator is empty",elevator.loadFactor(),"and passing --> pressFromFloor", waitList.sort((a, b) => a - b))
                        waitList.map(x => elevator.goToFloor(x))
                    }else if(passingFloor.length > 0 && pressFromFloor){
                        pressFromFloor.map(x => elevator.goToFloor(x))
                    }
                    else{
                        console.log("elevator is empty and no passing --> pressFromFloor", waitList.sort((a, b) => a - b))
                        pressFromFloor.sort((a, b) => a - b).map(x => elevator.goToFloor(x))
                    }
                    pressFromFloor.sort((a, b) => a - b).map(x => elevator.goToFloor(x))
                    console.log("-------------------------")
                }
                else{
                    console.log("ele NOT empty",elevator.loadFactor())
                    let goToList = [... new Set(elevator.getPressedFloors())];
                    if(elevator.loadFactor() < 1 && pressFromFloor) {
                        floors.forEach((floor)=>{
                            createWaitList(floor, elevator)
                        })
                        //delete duplicate
                        let combineAllList = matchingPassAndPressFloor.concat(pressFromFloor, goToList)
                        let  waitList= [... new Set(combineAllList)]

                        if(upOrDown === "up"  && floorPass === floorPress){
                            //console.log(upOrDown,goToList.sort((a, b) => a - b))
                            goToList.sort((a, b) => a - b).forEach(x => elevator.goToFloor(x));
                        }else if( upOrDown === "down" && floorPress === floorPress){
                            //console.log(upOrDown, goToList.sort((a, b) => b - a))
                            goToList.sort((a, b) => b - a).forEach(x => elevator.goToFloor(x));
                        }else{
                            console.log("if go to floor !==  wait floor  || pass floor !==  go to floor --> wait list",waitList.sort((a, b) => a - b))
                            waitList.forEach(x => elevator.goToFloor(x))
                        }
                    }else{
                        console.log("elevator is full and no pressFromFloor --> go to list",goToList)
                        goToList.forEach(x => elevator.goToFloor(x));
                    }
                    console.log("-------------------------")
                }
            });
        })
    },
        update: function(dt, elevators, floors) {
        }
}