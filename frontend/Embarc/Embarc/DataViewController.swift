//
//  DataViewController.swift
//  Embarc
//
//  Created by Javed Shaik on 9/29/17.
//  Copyright © 2017 Javed Shaik. All rights reserved.
//

import UIKit
import Alamofire




class DataViewController: UIViewController {

    @IBAction func nextViewToTimeLine(_ sender: Any) {
        
        self.performSegue(withIdentifier: "TimeLineSegue", sender: self)
    }
    
    
   
    @IBOutlet weak var dataLabel: UILabel!
    var dataObject: String = ""

    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }



}

