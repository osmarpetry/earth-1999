Feature: HeroesList

    I want to check heroes list set me to the light hero details

    Scenario: Click on specic hero and check content is right
        Given I go to 'http://localhost:3000'
        When I click on href 'hero/1009351'
        Then I should see 'hero/1009351' in the url
        And I should see 'Hulk'
        And I should see 'Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk. An all too often misunderstood hero, the angrier the Hulk gets, the stronger the Hulk gets.'

    Scenario: Back to movies list from a movie details clicking on first element a (the logo)
        Given I go to 'http://localhost:3000/hero/1009351'
        When I click on first element a
        Then I should't see 'hero/1009351' in the url
