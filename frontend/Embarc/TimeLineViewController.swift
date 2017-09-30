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
    
    
        func tableView(_ tableView: UITableView, _: UITableView, numberOfRowsInSection section: Int) -> Int{
        return journeys.count;
    }
    
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath ) -> UITableViewCell{
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        
        cell.textLabel?.text = journeys[indexPath.row]
        
        return cell
    }
}
