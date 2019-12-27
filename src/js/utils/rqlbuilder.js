
class RQLBuilder {
  static like (cname, cvalue) {
    return '"' + cname + '":{"$regex":"' + cvalue + '","$options":"i"}'
  }
  static equal (cname, cvalue) {
    return '"' + cname + '":"' + cvalue + '"'
  }
  static condition (cname, con, cvalue) {
    // !!<, <=, >, >= , !=, in , not in
    // $lt, $lte, $gt, $gte , $ne ,$in and $nin
    return '"' + cname + '":{"' + con + '":"' + cvalue + '"}'
  }
  static conditionfc (cname, con, cvalue) {
    // in , not in
    // $in and $nin
    return '"' + cname + '":{"' + con + '":' + cvalue + '}'
  }
  static and (rqls) {
    let ret = '"$and":['
    let i = 0
    rqls.forEach(val => {
      if (!val || val === undefined) return
      if (i > 0) ret += ','
      i++
      ret += '{' + val + '}'
    })
    ret += ']'
    return ret
  }
  static or (rqls) {
    let ret = '"$or":['
    let i = 0
    rqls.forEach(val => {
      if (!val || val === undefined) return
      if (i > 0) ret += ','
      i++
      ret += '{' + val + '}'
    })
    ret += ']'
    if (this.sql !== '') this.sql += ','
    this.sql += ret
  }
  static rql (sql) {
    return encodeURIComponent('{' + sql + '}')
  }
}
export default RQLBuilder
