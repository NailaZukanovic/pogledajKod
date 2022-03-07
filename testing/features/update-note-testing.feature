Feature: test the upadte api of note _id and title and category and details 

Scenario: update note data
    Given the put api url is "http://localhost:4000/notes/"
    And update note id is "5e9c74a621951d159a4a85df"
    And new data is
    """
        {
#             "_id": "5e9c74a621951d159a4a85df",
#             "title": "nesto",
              "category" : 'work',
              "details": 'alsmdlkam alsmdlkasml alksmdlkamskld'
#         }
    """
#    When send "PUT" request to given url and given data to noteId
    
#    Then I will get update note _id "5e9c74a621951d159a4a85df" and title "nesto" and category "work" and details "alsmdlkam alsmdlkasml alksmdlkamskld"
    