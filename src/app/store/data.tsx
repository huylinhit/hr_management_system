export const USERINFOR = [
  {staffId: 1, userId: 1, lastName:"Nguyen", firstName:"Ngoc", dob:"2003-09-15", phone:"0909090909", gender:0, address:"hok bik", 
    country:"VietNam", citizenId:"086728991835", departmentId: 1, position: "Manager", hireDate:"2020-01-01", bankAccount:"oidwofew", 
    bankAccountName:"Nguyen Bao Ngoc", bank:"abbank", WorkTimeByYear:12, accountStatus:1},
  {staffId: 2, userId: 2, lastName:"Nguyen", firstName:"Ngoc", dob:"2003-09-15", phone:"0909090909", gender:0, address:"hok bik", 
    country:"VietNam", citizenId:"086728991835", departmentId: 1, position: "", hireDate:"2020-01-01", bankAccount:"oidwofew", 
    bankAccountName:"Nguyen Bao Ngoc", bank:"abbank", WorkTimeByYear:12, accountStatus:1},
  {staffId: 3, userId: 3, lastName:"Nguyen", firstName:"Ngoc", dob:"2003-09-15", phone:"0909090909", gender:0, address:"hok bik", 
    country:"VietNam", citizenId:"086728991835", departmentId: 1, position: "", hireDate:"2020-01-01", bankAccount:"oidwofew", 
    bankAccountName:"Nguyen Bao Ngoc", bank:"abbank", WorkTimeByYear:12, accountStatus:1},
  {staffId: 4, userId: 4, lastName:"Mai", firstName:"Viet", dob:"2003-09-15", phone:"0909090909", gender:0, address:"hok bik", 
    country:"VietNam", citizenId:"086728991835", departmentId: 2, position: "Manager", hireDate:"2020-01-01", bankAccount:"oidwofew", 
    bankAccountName:"Nguyen Bao Ngoc", bank:"abbank", WorkTimeByYear:12, accountStatus:1},
  {staffId: 5, userId: 5, lastName:"Nguyen", firstName:"Ngoc", dob:"2003-09-15", phone:"0909090909", gender:0, address:"hok bik", 
    country:"VietNam", citizenId:"086728991835", departmentId: 2, position: "", hireDate:"2020-01-01", bankAccount:"oidwofew", 
    bankAccountName:"Nguyen Bao Ngoc", bank:"abbank", WorkTimeByYear:12, accountStatus:1},
]

export const DEPARTMENT = [
  {departmentId: 1, departmentName: "Department01"},
  {departmentId: 2, departmentName: "Department02"},
  {departmentId: 3, departmentName: "Department03"},
  {departmentId: 4, departmentName: "Department04"},
  {departmentId: 5, departmentName: "Department05"},
]

export const OTTYPE = [
{otTypeId: 1, typeName: "Làm thêm ngày trong tuần", typePercentage: 1.5},
{otTypeId: 2, typeName: "Làm thêm ngày cuối tuần", typePercentage: 2},
{otTypeId: 3, typeName: "Làm thêm ngày lễ", typePercentage: 3},
]

export const STAFF = {staffId: 1, userId: 1, lastName:"Nguyen", firstName:"Ngoc", dob:"2003-09-15", phone:"0909090909", gender:0, address:"hok bik", 
                        country:"VietNam", citizenId:"086728991835", departmentId: 1, position: "Manager", hireDate:"2020-01-01", bankAccount:"oidwofew", 
                        bankAccountName:"Nguyen Bao Ngoc", bank:"abbank", WorkTimeByYear:12, accountStatus:1}
export const OTLOG = {otLogId: 1, staffId: 11, otTypeId: 1, logStart:"2020-11-11 17:00:00", logEnd:"2020-11-11 20:00:00", logHours:3, reason:"none", status:"Chờ duyệt", 
                        processNote:"", respondenceId: 0, createAt: "2020-11-11", changeStatusTime: "", enable: true}

export const OTLOGS = [
{otLogId: 1, staffId: 11, otTypeId: 1, logStart:"2020-11-11 17:00:00", logEnd:"2020-11-11 20:00:00", logHours:3, reason:"none", status:"Chờ duyệt", 
  processNote:"", respondenceId: 0, createAt: "2020-11-11", changeStatusTime: "", enable: true},
{otLogId: 1, staffId: 11, otTypeId: 1, logStart:"2020-11-11 17:00:00", logEnd:"2020-11-11 20:00:00", logHours:3, reason:"none", status:"Chờ duyệt", 
  processNote:"", respondenceId: 1, createAt: "2020-11-11", changeStatusTime: "", enable: true},
{otLogId: 1, staffId: 11, otTypeId: 1, logStart:"2020-11-11 17:00:00", logEnd:"2020-11-11 20:00:00", logHours:3, reason:"none", status:"Từ chối", 
  processNote:"", respondenceId: 2, createAt: "2020-11-11", changeStatusTime: "2020-11-11", enable: true},
{otLogId: 1, staffId: 11, otTypeId: 1, logStart:"2020-11-11 17:00:00", logEnd:"2020-11-11 20:00:00", logHours:3, reason:"none", status:"Đồng ý", 
  processNote:"", respondenceId: 3, createAt: "2020-11-11", changeStatusTime: "2020-11-11", enable: true},
{otLogId: 1, staffId: 11, otTypeId: 1, logStart:"2020-11-11 17:00:00", logEnd:"2020-11-11 20:00:00", logHours:3, reason:"none", status:"Đồng ý", 
  processNote:"", respondenceId: 4, createAt: "2020-11-11", changeStatusTime: "2020-11-11", enable: true},
{otLogId: 1, staffId: 11, otTypeId: 1, logStart:"2020-11-11 17:00:00", logEnd:"2020-11-11 20:00:00", logHours:3, reason:"none", status:"Từ chối", 
  processNote:"", respondenceId: 5, createAt: "2020-11-11", changeStatusTime: "2020-11-11", enable: true},

]
