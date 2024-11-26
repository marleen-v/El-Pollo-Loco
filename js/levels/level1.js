let level1; 

level1 = new Level(
    [   new Endboss(),  
        new ChickenSmall(),
       /*  new ChickenSmall(),
        new ChickenSmall(),
          
        new Chicken(), 
        new Chicken(),  
           
        new ChickenSmall(),*/
        new Chicken(),  
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
    ],
    [
        new Coin(400, 300),
        new Coin(480, 300),

        new Coin(800, 260),
        new Coin(880, 210),
        new Coin(960, 150),
        new Coin(1040, 210),
        new Coin(1120, 260),

        new Coin(1700, 210),
        new Coin(1780, 150),
        new Coin(1860, 210),

     ],
     [
        new Bottle(0, 150),
        new Bottle(1, 1000),
        new Bottle(1, 1550),
        new Bottle(0, 1900),
        new Bottle(0, 1990),
     ]
);

