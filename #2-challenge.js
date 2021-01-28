{
    init: function(elevators, floors) {
        var elevator = elevators[0]; 
        elevator.on("idle", function() {
            for (let i = 0 ; i < floors.length; i ++){
                if(elevator.getPressedFloors().length > 0) {
                    console.log("floor pressed ", this.getPressedFloors())
                    elevator.goToFloor(elevator.getPressedFloors()[0]);
                }else{
                    elevator.goToFloor(i)
                    
                }
            }
        });
    },
        update: function(dt, elevators, floors) {
        }
}