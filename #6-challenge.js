{
    init: function(elevators, floors) {
        elevators.map((elevator)=>{
            elevator.on("idle", function() {
                floors.map((floor)=>{
                    if(elevator.getPressedFloors().length > 0) {
                        elevator.goToFloor(elevator.getPressedFloors()[0]);
                    }
                })
            });
        })
    },
        update: function(dt, elevators, floors) {
        }
}