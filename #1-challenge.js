{
    init: function(elevators, floors) {
        var elevator = elevators[0]; 
        elevator.on("idle", function() {
            for (let i = 0 ; i < floors.length; i ++){
                elevator.goToFloor(i);
            }
        });
    },
        update: function(dt, elevators, floors) {
        }
}