
{
    pressFromFloor:[],
        passingFloor:[],   
            matchingPassAndPressFloor:[],
                upOrDown: "",
                    waitList:[],
                        combineAllList:[],
                        goToList:[],
                            init: function(elevators, floors) {
                                let pressFromFloor=this.pressFromFloor;
                                let passingFloor=this.passingFloor;
                                let matchingPassAndPressFloor=this.matchingPassAndPressFloor;
                                let upOrDown= this.upOrDown;
                                let waitList = this.waitList;
                                let combineAllList= this.combineAllList;
                                let goToList=this.goToList;

                                //create pressed from floor list
                                function createPressFromFloorList(){
                                    let floor = this;
                                    console.log(this)
                                    pressFromFloor.push(floor.floorNum()); 
                                }
                                //create passing from floor list and find the matching of passing floors and pressed from floor
                                function createPassingFloorList(floorNum, direction){
                                    passingFloor.push(floorNum)
                                    upOrDown = direction
                                    //find the matching passing floor and the floor in waitlist
                                    matchingPassAndPressFloor = passingFloor.filter(element => pressFromFloor.includes(element));
                                }

                                function idleElevator(){
                                    let elevator = this;
                                    //if elevator NOT empty
                                    if(elevator.loadFactor() > 0) {  
                                        console.log("ele is NOT empty",elevator.loadFactor(), "pressFromFloor.length",pressFromFloor.length)
                                        //create list of floor that pressed inside elevator
                                        goToList = [... new Set(elevator.getPressedFloors())];
                                        //if elevator not full yet
                                        if(elevator.loadFactor() < 1 && pressFromFloor) {
                                            //combine matchingPassAndPressFloor,pressFromFloor, goToList
                                            combineAllList = matchingPassAndPressFloor.concat(pressFromFloor, goToList)
                                            //create new waitlist and delete duplicate values
                                            waitList = [... new Set(combineAllList)]
                                            console.log("pressFromFloor", [... new Set(pressFromFloor)])
                                            console.log("passingFloor", [... new Set(passingFloor)])
                                            console.log("matchingPassAndPressFloor", [... new Set(passingFloor.filter(element => pressFromFloor.includes(element)))])
                                            console.log("goToList",goToList)
                                            console.log("waitList",waitList)
                                            console.log("upOrDown",upOrDown)

                                            if( upOrDown === "up"){
                                                console.log(upOrDown,waitList.sort((a, b) => b-a))
                                                waitList.sort((a, b) => b - a).forEach((x) => {
                                                    elevator.goToFloor(x);
                                                    pressFromFloor = pressFromFloor.splice(x, 1);
                                                });                                            }
                                            else if( upOrDown === "down"){
                                                console.log(upOrDown, waitList.sort((a, b) => a-b))
                                                waitList.sort((a, b) => a - b).forEach((x) => {
                                                    elevator.goToFloor(x);
                                                    pressFromFloor = pressFromFloor.splice(x, 1);
                                                })
                                            }else{
                                                console.log("not go up or down")
                                                waitList.sort((a, b) => a - b).forEach(x => elevator.goToFloor(x))
                                            }
                                        }
                                        //if elevator is full
                                        else{
                                            console.log("elevator is FULL", goToList)
                                            goToList.sort((a, b) => a - b).forEach(x => elevator.goToFloor(x))
                                        }
                                        console.log("-------------------------")
                                    }
                                    //if ele emplty
                                    else{
                                        console.log("ele empty",elevator.loadFactor(), "pressFromFloor.length",pressFromFloor.length)
                                        if(pressFromFloor.length > 0) {
                                            //combine matchingPassAndPressFloor,pressFromFloor
                                            combineAllList = matchingPassAndPressFloor.concat(pressFromFloor)
                                            //create new waitlist and delete duplicate values
                                            waitList= [... new Set(combineAllList)]
                                            console.log("pressFromFloor", [... new Set(pressFromFloor)])
                                            console.log("passingFloor", [... new Set(passingFloor)])
                                            console.log("matchingPassAndPressFloor", [... new Set(passingFloor.filter(element => pressFromFloor.includes(element)))])
                                            console.log("waitList",waitList)
                                            console.log("upOrDown",upOrDown)

                                            if(upOrDown === "up"){
                                                console.log("matchingPassAndPressFloor is true",matchingPassAndPressFloor,upOrDown, waitList)
                                                waitList.sort((a, b) => b - a).forEach((x) => {
                                                    elevator.goToFloor(x);
                                                    pressFromFloor = pressFromFloor.splice(x, 1);
                                                });                                            
                                            }else if( upOrDown === "down"){
                                                console.log("matchingPassAndPressFloor is true",matchingPassAndPressFloor,upOrDown, waitList)
                                                waitList.sort((a, b) => a - b).forEach((x) => {
                                                    elevator.goToFloor(x);
                                                    pressFromFloor = pressFromFloor.splice(x, 1);
                                                })
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
                                    elevator.on("passing_floor",createPassingFloorList);
                                    elevator.on("idle", idleElevator);
                                });
                                floors.forEach((floor)=>{
                                    floor.on('up_button_pressed down_button_pressed',createPressFromFloorList );
                                })
                            },
                                update: function(dt, elevators, floors) {
                                }
}