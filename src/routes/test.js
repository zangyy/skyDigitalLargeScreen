// 定义一个点类
class Point {
  constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
  }
}

// 定义一个线段类
class Segment {
  constructor(p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
  }
}

// 计算两个点之间的距离
function distance(p1, p2) {
  let dx = p1.x - p2.x;
  let dy = p1.y - p2.y;
  let dz = p1.z - p2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// 计算两个向量的叉积
function crossProduct(v1, v2) {
  let x = v1.y * v2.z - v2.y * v1.z;
  let y = v1.z * v2.x - v2.z * v1.x;
  let z = v1.x * v2.y - v2.x * v1.y;
  return new Point(x, y, z);
}

// 判断两条线段是否相交
function isIntersect(s1, s2) {
  // 获取两条线段的端点
  let a = s1.p1;
  let b = s1.p2;
  let c = s2.p1;
  let d = s2.p2;

  // 构造向量 ab 和 cd
  let ab = new Point(b.x - a.x, b.y - a.y, b.z - a.z);
  let cd = new Point(d.x - c.x, d.y - c.y, d.z - c.z);

  // 判断 ab 和 cd 是否平行，如果平行则不相交
  if (distance(crossProduct(ab, cd), new Point(0, 0 ,0)) < 0.000001) {
      return false;
  }

   // 构造向量 ac 和 ad
   let ac = new Point(c.x - a.x, c.y - a.y ,c.z - a.z);
   let ad = new Point(d.x - a.x ,d.y- a.y ,d.z- a.z);

   // 判断 ac 和 ad 是否在 ab 的同侧，如果是则不相交
   if (crossProduct(ab ,ac).x * crossProduct(ab ,ad).x > 0 &&
       crossProduct(ab ,ac).y * crossProduct(ab ,ad).y > 0 &&
       crossProduct(ab ,ac).z * crossProduct(ab ,ad).z > 0) {
           return false; 
       }

    // 构造向量 ca 和 cb 
    let ca= new Point(a .x- c .x,a .y- c .y,a .z- c .z); 
    let cb= new Point(b .x- c .x,b .y- c .y,b .z- c .z); 

    // 判断 ca 和 cb 是否在 cd 的同侧，如果是则不相交 
    if (crossProduct(cd ,ca).x* crossProduct(cd ,cb).x> 0 && 
        crossProduct(cd ,ca).y* crossProduct(cd ,cb).y> 0 && 
        crossProduct(cd ,ca).z* crossProduct(cd ,cb).z> 0) { 
            return false; 
          } 

    // 否则就相交 
    return true; 

}