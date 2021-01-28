{
    init: function(elevators, floors) {
            elevators.map((elevator)=>{
                elevator.on("idle", function() {
                    floors.map((floor)=>{
                        if(elevator.getPressedFloors().length > 0) {
                            elevator.goToFloor(elevator.getPressedFloors()[0]);
                        }else{
                            if(elevator.loadFactor() === 0) {
                                elevator.goToFloor(0)
                            }else{
                                elevator.goToFloor(floor)
                            }
                        }
                    })
                });
            })
    },
        update: function(dt, elevators, floors) {
        }
}

