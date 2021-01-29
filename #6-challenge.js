{
    init: function(elevators, floors) {
        elevators.map((elevator)=>{
            elevator.on("idle", function() {
                elevator.getPressedFloors().forEach(function(floor) {
                    elevator.goToFloor(floor);
                });
            });
        })
    },
        update: function(dt, elevators, floors) {
        }
}