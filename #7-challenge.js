

{
    init: function(elevators, floors) {
        //let elevatorIndle = (elevator) =>{}
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

