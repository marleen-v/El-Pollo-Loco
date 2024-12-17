let level1; 

function initLevel(){
    level1 = new Level(
        [   new Endboss(),  
           /*  new ChickenSmall(),
            new ChickenSmall(),
         
             new Chicken(), 
           new ChickenSmall(),
            new ChickenSmall(),
              
            new Chicken(), 
            new Chicken(),  
            new ChickenSmall(),
            new ChickenSmall(),
              
            new Chicken(), 
            new Chicken(),  
            new ChickenSmall(),
            new ChickenSmall(),
              
            new Chicken(), 
            new Chicken(),  
               
            new ChickenSmall(),
            new Chicken(),   */
        ],
        [   
            new Cloud("1"), 
            new Cloud("2"),
            new Cloud("1"), 
            new Cloud("2"),
            new Cloud("1"), 
        
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

            /* new BackgroundObject(4, -1439),
            new BackgroundObject(4, 0),
            new BackgroundObject(4, 1439),
            new BackgroundObject(4, 1439 * 2), 
            new BackgroundObject(4, 1439 * 3), */
        ],
        [
            new Coin(400, 300),
            new Coin(480, 300),
    
           /*  new Coin(800, 260),
            new Coin(880, 210),
            new Coin(960, 150),
            new Coin(1040, 210),
            new Coin(1120, 260),
    
            new Coin(1700, 210),
            new Coin(1780, 150),
            new Coin(1860, 210),

            new Coin(3000, 260),
            new Coin(3080, 210),
            new Coin(3160, 150),
            new Coin(3240, 210),
            new Coin(4020, 260), */
    
         ],
         [
            new Bottle(0, 900),
            new Bottle(1, 1000),
            new Bottle(1, 1550),
            new Bottle(0, 1900),
            new Bottle(0, 1990),
            new Bottle(0, 2500),
            new Bottle(1, 2700),
            new Bottle(1, 3400),
            new Bottle(1, 3550),
            new Bottle(0, 3700),
        
         ]
     
    );
    
}


