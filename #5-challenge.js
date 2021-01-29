{
    init: function(elevators, floors) {
        elevators.map((elevator)=>{
            elevator.on("idle", function() {
                //floors.map((floor)=>{
                    elevator.getPressedFloors().forEach(function(floor) {
                        elevator.goToFloor(floor);
                        //console.log(floor)
                    });
             
            });
        })
    },
        update: function(dt, elevators, floors) {
        }
}