{
    init: function(elevators, floors) {
       
            elevators.map((elevator)=>{
                elevator.on("idle", function() {
                    floors.map((floor)=>{


                        if(elevator.getPressedFloors().length > 0) {
                            elevator.goToFloor(elevator.getPressedFloors()[0]);
                            floor.on('up_button_pressed down_button_pressed', function () {
                                console.log(elevator.getPressedFloors()[0], floor.floorNum());
                            });
                        }else{
                            if(elevator.loadFactor() === 0) {
                                // Maybe use this elevator, since it's not full yet?
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