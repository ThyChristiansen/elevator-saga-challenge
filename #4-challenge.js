{
    init: function(elevators, floors) {
        for (let i of elevators){
            i.on("idle", function() {
                for (let j of floors){
                    if(i.getPressedFloors().length > 0) {
                        i.goToFloor(i.getPressedFloors()[0]);
                    }else{
                        if(i.loadFactor() === 0) {
                            // Maybe use this elevator, since it's not full yet?
                            i.goToFloor(0)
                        }else{
                            i.goToFloor(j)
                        }
                    }
                }
            });
        }
    },
        update: function(dt, elevators, floors) {
        }
}