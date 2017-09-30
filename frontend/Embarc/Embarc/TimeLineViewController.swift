//
//  TimeLineViewController.swift
//  Embarc
//
//  Created by Javed Shaik on 9/29/17.
//  Copyright © 2017 Javed Shaik. All rights reserved.
//
import UIKit 
import Alamofire

class TimeLineViewController: UIViewController {
    
    
    var journeys = ["journey 1", "journey 2"]
    
    
    override func viewDidLoad(){
        super.viewDidLoad()
        
        print("getting request")
        
        
       
        Alamofire.request( "http://34.201.17.154:3000/getListJourneys", method: .post, parameters: parameters, encoding: JSONEncoding.default)
            .responseJSON { response in
                print(response)
//to get status code
                if let status = response.response?.statusCode {
                    switch(status){
                    case 201:
                        print("example success")
                    default:
                        print("error with response status: \(status)")
                    }
                }
//to get JSON return value
            if let result = response.result.value {
                let JSON = result as! NSDictionary
                print(JSON)
            }

    
    
        func tableView(_ tableView: UITableView, _: UITableView, numberOfRowsInSection section: Int) -> Int{
            
            
        return journeys.count;
    }
    
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath ) -> UITableViewCell{
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        
        cell.textLabel?.text = journeys[indexPath.row]
            
            
        
        return cell
    }
}
    }
    
}
