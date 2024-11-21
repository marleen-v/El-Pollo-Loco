let level1; 


/* function initLevel(){
hideStartScreen();  
canvas = document.getElementById("canvas");
world = new World(canvas, keyboard);
canvas.classList.toggle("d_none");  */


level1 = new Level(
    [
        /* new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
          
        new Chicken(), 
        new Chicken(),  
           
       new ChickenSmall(),
       new Chicken(),  
       new Endboss()   */
    ],
    [   
        new Cloud("1"), 
        new Cloud("2"),
        new Cloud("1"), 
        new Cloud("2"),
        new Cloud("1"), 
        new Cloud("2"),
        new Cloud("1"), 
        new Cloud("2"),
        new Cloud("1"), 
        new Cloud("2"),
        
        
    ],
    [
        new BackgroundObject(0, -1439),
        new BackgroundObject(0, 0),
        new BackgroundObject(0, 1439),
        new BackgroundObject(0, 1439*2), 
        new BackgroundObject(0, 1439*3), 

        new BackgroundObject(1, -1439),
        new BackgroundObject(1, 0),
        new BackgroundObject(1, 1439),
        new BackgroundObject(1, 1439 * 2), 
        new BackgroundObject(1, 1439 * 3), 

        new BackgroundObject(2, -1439),
        new BackgroundObject(2, 0),
        new BackgroundObject(2, 1439),
        new BackgroundObject(2, 1439 * 2), 
        new BackgroundObject(2, 1439 * 3),

        new BackgroundObject(3, -1439),
        new BackgroundObject(3, 0),
        new BackgroundObject(3, 1439),
        new BackgroundObject(3, 1439 * 2), 
        new BackgroundObject(3, 1439 * 3),

     
        /* new BackgroundObject(0),
        new BackgroundObject(1),
        new BackgroundObject(2),
        new BackgroundObject(3), 

        new BackgroundObject(4),
        new BackgroundObject(5),
        new BackgroundObject(6),
        new BackgroundObject(7), 

        new BackgroundObject(8),
        new BackgroundObject(9),
        new BackgroundObject(10),
        new BackgroundObject(11), 

        new BackgroundObject(12),
        new BackgroundObject(13),
        new BackgroundObject(14),
        new BackgroundObject(15), 

        new BackgroundObject(16),
        new BackgroundObject(17),
        new BackgroundObject(18),
        new BackgroundObject(19),  */
    ],
    [
        new Coin(),
        new Coin(),
        new Coin()
     ],
     [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
     ]
);

/* } */