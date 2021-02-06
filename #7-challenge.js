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
    pressFromFloor:[],
    passingFloor:[],   
    matchingPassAndPressFloor:[],
    upOrDown: "",
    waitList:[],
    combineAllList:[],
    init: function(elevators, floors) {
        let pressFromFloor=this.pressFromFloor;
        let passingFloor=this.passingFloor;
        let matchingPassAndPressFloor=this.matchingPassAndPressFloor;
        let upOrDown= this.upOrDown;
        let waitList = this.waitList;
        let combineAllList= this.combineAllList;
        
        function createPressFromFloorList(){
            let floor = this;
            console.log(this)
            pressFromFloor.push(floor.floorNum()); 
        }
        
        function createPassingFloorList(floorNum, direction){
            passingFloor.push(floorNum)
            upOrDown = direction
            //find the matching passing floor and the floor in waitlist
            matchingPassAndPressFloor = passingFloor.filter(element => pressFromFloor.includes(element));
        }
        
        function idleElevator(){
            let elevator = this;
            if(elevator.loadFactor() > 0) {  
                console.log("ele is NOT empty",elevator.loadFactor(), "pressFromFloor.length",pressFromFloor.length)
                let goToList = [... new Set(elevator.getPressedFloors())];
                if(elevator.loadFactor() < 1 && pressFromFloor) {
                    combineAllList = matchingPassAndPressFloor.concat(pressFromFloor, goToList)
                    //delete duplicate
                    waitList = [... new Set(combineAllList)]
                    console.log("pressFromFloor", [... new Set(pressFromFloor)])
                    console.log("passingFloor", [... new Set(passingFloor)])
                    console.log("matchingPassAndPressFloor", [... new Set(passingFloor.filter(element => pressFromFloor.includes(element)))])
                    console.log("goToList",goToList)
                    console.log("waitList",waitList)
                    console.log("upOrDown",upOrDown)

                    if( upOrDown === "up"){
                        console.log(upOrDown,waitList.sort((a, b) => b-a))
                        waitList.sort((a, b) =>  b-a ).forEach(x => elevator.goToFloor(x));
                    }
                    else if( upOrDown === "down"){
                        console.log(upOrDown, waitList.sort((a, b) => a-b))
                        waitList.sort((a, b) => a-b).forEach(x => elevator.goToFloor(x));
                    }else{
                        console.log("not go up or down")
                        waitList.sort((a, b) => a - b).forEach(x => elevator.goToFloor(x))
                    }
                }else{
                    goToList.sort((a, b) => a - b).forEach(x => elevator.goToFloor(x))

                }
                console.log("-------------------------")

            }
            //Ele emplty
            else{
                console.log("ele empty",elevator.loadFactor(), "pressFromFloor.length",pressFromFloor.length)
                if(pressFromFloor.length > 0) {
                    combineAllList = matchingPassAndPressFloor.concat(pressFromFloor)
                    //delete duplicate
                    waitList= [... new Set(combineAllList)]
                    console.log("pressFromFloor", [... new Set(pressFromFloor)])
                    console.log("passingFloor", [... new Set(passingFloor)])
                    console.log("matchingPassAndPressFloor", [... new Set(passingFloor.filter(element => pressFromFloor.includes(element)))])
                    console.log("waitList",waitList)
                    console.log("upOrDown",upOrDown)

                    if(matchingPassAndPressFloor.length > 0 && upOrDown === "up"){
                        console.log("matchingPassAndPressFloor is true",matchingPassAndPressFloor,upOrDown, waitList)
                        waitList.sort((a, b) =>  b - a).map(x => elevator.goToFloor(x))
                    }else if(matchingPassAndPressFloor.length > 0 && upOrDown === "down"){
                        console.log("matchingPassAndPressFloor is true",matchingPassAndPressFloor,upOrDown, waitList)
                        waitList.sort((a, b) =>  a - b).map(x => elevator.goToFloor(x))
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
        }
        

        
        elevators.forEach((elevator)=>{
            
            floors.forEach((floor)=>{
                floor.on('up_button_pressed down_button_pressed',createPressFromFloorList );
                elevator.on("passing_floor",createPassingFloorList);

            })
            elevator.on("idle", idleElevator);

        })
        
       
    },
        update: function(dt, elevators, floors) {
        }
}