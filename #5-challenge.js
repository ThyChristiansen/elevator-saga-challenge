{
    init: function(elevators, floors) {
        elevators.map((elevator)=>{
            elevator.on("idle", function() {
                if(elevator.getPressedFloors().length > 0) {
                    elevator.getPressedFloors().forEach(function(floor) {
                        elevator.goToFloor(floor);
                    });
                }else{
                    if(elevator.loadFactor() === 0) {
                        elevator.goToFloor(0);
                    }else{
                        elevator.on("floor_button_pressed", function(floorNum) {
                            elevator.goToFloor(floorNum);
                        })
                    }
                }
            });
        })
    },
        update: function(dt, elevators, floors) {

        }
}