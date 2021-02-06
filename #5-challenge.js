
{
    pressFromFloor:[],
        passingFloor:[],   
        matchingPassAndPressFloor:[],
        upOrDown: "",
        combineAllList:[],
        waitList:[],
        init: function(elevators, floors) {
        let pressFromFloor=this.pressFromFloor;
        let passingFloor=this.passingFloor;
        let matchingPassAndPressFloor=this.matchingPassAndPressFloor;
        let upOrDown= this.upOrDown;
        let waitList = this.waitList;
        let combineAllList= this.combineAllList;
        let createPressFromFloorList = (floor) =>{
            floor.on('up_button_pressed down_button_pressed', function () {
                pressFromFloor.push(floor.floorNum());
            });
        }
        let createPassingFloorList= (elevator) =>{
            elevator.on("passing_floor", function(floorNum, direction) {
                passingFloor.push(floorNum);
                upOrDown = direction;
                //find the matching passing floor and the floor in waitlist
                matchingPassAndPressFloor = passingFloor.filter(element => pressFromFloor.includes(element));
            });
        }

        floors.forEach((floor)=>{
            createPressFromFloorList(floor);
        })
        elevators.forEach((elevator)=>{
            createPassingFloorList(elevator);



            elevator.on("idle", function() {
                if(elevator.loadFactor() > 0) {  
                    console.log("ele is NOT empty",elevator.loadFactor(), "pressFromFloor.length",pressFromFloor.length)
                    let goToList = [... new Set(elevator.getPressedFloors())];
                    if(elevator.loadFactor() < 1 && pressFromFloor) {

                        combineAllList = matchingPassAndPressFloor.concat( goToList)

                        //delete duplicate
                        waitList = [... new Set(combineAllList)]
                        console.log("pressFromFloor", [... new Set(pressFromFloor)])
                        //console.log("passingFloor", [... new Set(passingFloor)])
                        //console.log("matchingPassAndPressFloor", [... new Set(passingFloor.filter(element => pressFromFloor.includes(element)))])
                        //console.log("goToList",goToList)
                        //console.log("waitList",waitList)
                        //console.log("upOrDown",upOrDown)

                        if( upOrDown === "up"){
                            console.log(upOrDown,waitList.sort((a, b) => a-b))
                            waitList.sort((a, b) =>  a - b ).forEach(x => elevator.goToFloor(x));
                        }
                        else if( upOrDown === "down"){
                            console.log(upOrDown, waitList.sort((a, b) => b - a))
                            waitList.sort((a, b) => b-a).forEach(x => elevator.goToFloor(x));
                        }else{
                            console.log("not go up or down")
                            waitList.sort((a, b) => a - b).forEach(x => elevator.goToFloor(x))
                        }
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
                        //console.log("passingFloor", [... new Set(passingFloor)])
                        //console.log("matchingPassAndPressFloor", [... new Set(passingFloor.filter(element => pressFromFloor.includes(element)))])
                        //console.log("waitList",waitList)
                        //console.log("upOrDown",upOrDown)

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
            });
        })

        },
        update: function(dt, elevators, floors) {
        }
}