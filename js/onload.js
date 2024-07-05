function Init(){
    db.pattern
      .each((val)=>{
        let op = document.createElement("option");
        op.text = val.name;   
        errorPattern.appendChild(op);
      })
}