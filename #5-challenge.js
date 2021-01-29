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
                    }
                }
            });
        })
    },
        update: function(dt, elevators, floors) {

        }
}