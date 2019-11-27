const paging = function(pageNo,pageSize,data){
    let arr = data.slice((pageNo-1)*pageSize,pageNo*pageSize)
    return arr
}

module.exports = paging