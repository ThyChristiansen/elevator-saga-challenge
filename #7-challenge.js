
{
    init: function(elevators, floors) {
        //let elevatorIndle = (elevator) =>{}
        for(let elevator of elevators){
            elevator.on("idle", function(){
                if(elevator.getPressedFloors().length > 0) {
                    elevator.goToFloor(elevator.getPressedFloors()[0]);
                }else{
                    floors.forEach(function (floor) {
                        //console.log(elevator.loadFactor() )
                        if(elevator.loadFactor() === 0 ) {
                            floor.on('up_button_pressed down_button_pressed', function () {
                                console.log("floor pressed",floor.floorNum())

                                elevator.on("passing_floor", function(floorNum, direction) { 
                                    //console.log('234',floorNum,direction)
                                    if(direction === "up" && floorNum === floor.floorNum()){
                                        console.log("1","up",floor.floorNum())
                                        //elevator.stop();
                                        elevator.goToFloor(floorNum, true)
                                    }else if(direction === "down" && floorNum === floor.floorNum()){
                                        console.log("1","down",floor.floorNum())
                                        //elevator.stop();
                                        elevator.goToFloor(floorNum, true)
                                    }
                                    else{
                                        console.log("3")
                                        //elevator.stop();
                                        elevator.goToFloor(floor.floorNum())
                                    }
                                });
                            });
                        }else{
                            console.log("else")
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