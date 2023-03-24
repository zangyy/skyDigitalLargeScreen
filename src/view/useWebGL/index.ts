import { createProgramFromSources, resizeCanvasToDisplaySize } from './newWebgl-utls'
const vertexShader = `#version 300 es
  in vec4 a_position;
  in vec4 a_color;
  out vec4 v_color;
  in vec3 a_normal;
  out vec3 v_normal;
  uniform mat4 u_matrix;
  void main() {
    gl_Position = u_matrix * a_position;
    v_color = a_color;
    // 将法向量传递给片段着色器
    v_normal = a_normal;
  }
`
const fragmentShader = `#version 300 es
  precision highp float;
  in vec4 v_color;
  out vec4 outColor;
  uniform vec4 u_color;
  // 从顶点着色器中传入的法向量值
  in vec3 v_normal;
  uniform vec3 u_reverseLightDirection;
  void main() {
    // outColor = u_color;
    outColor = v_color;
    // 因为 v_normal 是一个变化的插值所以它不会是一个单位向量。 归一化使它成为单位向量
    // vec3 normal = normalize(v_normal);

    // 通过取法线与光线反向的点积计算光
    // float light = dot(normal, u_reverseLightDirection);

    // 让我们只将颜色部分（不是 alpha）乘以光
    // outColor.rgb *= light;
  }
`
function radToDeg(r: any) {
  return r * 180 / Math.PI;
}

function degToRad(d: any) {
  return d * Math.PI / 180;
}
// var translation = [-1490, -3600, -9000]; // 位置
// // var rotation = [degToRad(20), degToRad(20), degToRad(0)]; // 旋转
// var rotation = [degToRad(23), degToRad(55), degToRad(0)]; // 旋转
// var scale = [1, 1, 1]; // 缩放
// // var color = [Math.random(), Math.random(), Math.random(), 1];
// // var color = [0, 0, 0, 1];
// var fieldOfViewRadians = degToRad(60); // 视距角度



function init(canvas: any, SourceData: Array<number>, colorData: Array<number>, Type: string,translation:Array<number>,rotation:Array<number>) {
  var translation = translation; // 位置
  var rotation = [degToRad(rotation[0]), degToRad(rotation[1]), degToRad(rotation[2])]; // 旋转
  var scale = [1, 0.9, 1]; // 缩放
  // var color = [0, 0, 0, 1];
  var fieldOfViewRadians = degToRad(60); // 视距角度


  const gl = canvas.getContext('webgl2');

  if (!gl)
    throw new Error('WebGL2 not supported');
  var vertexShaderSource = vertexShader;
  var fragmentShaderSource = fragmentShader;
  // 着色器样板
  var program = createProgramFromSources(gl, [vertexShaderSource, fragmentShaderSource]);
  // 查找属性位置
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var normalLocation = gl.getAttribLocation(program, "a_normal");
  // 查找颜色位置
  // var colorLocation = gl.getUniformLocation(program, "u_color");
  // 查找矩阵位置
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");
  var reverseLightDirectionLocation =
    gl.getUniformLocation(program, "u_reverseLightDirection");
  // 查找颜色位置
  var colorAttributeLocation = gl.getAttribLocation(program, "a_color");

  // 创建顶点位置缓冲区
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl, SourceData);
  // 创建顶点数组对象(属性状态)
  var vao = gl.createVertexArray();
  // 让它成为我们目前的工作对象
  gl.bindVertexArray(vao);
  // 启用属性
  gl.enableVertexAttribArray(positionAttributeLocation);
  // 告诉属性怎么从 positionBuffer (ARRAY_BUFFER) 中读取位置
  var size = 3;          // 每次迭代使用 3 个单位的数据
  var type = gl.FLOAT;   // 单位数据类型是32位的浮点型
  var normalize = false; // 不需要归一化数据
  var stride = 0;        // 0 = 移动距离 * 单位距离长度sizeof(type)  每次迭代跳多少距离到下一个数据
  var offset = 0;        // 从绑定缓冲的起始处开始
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

  // 创建颜色缓冲区，将其与当前的 ARRAY_BUFFER 绑定
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setColors(gl, colorData);
  // 启用颜色属性
  gl.enableVertexAttribArray(colorAttributeLocation);
  // 告诉颜色属性怎么从 colorBuffer (ARRAY_BUFFER) 中读取颜色值
  var size = 4;          // 每次迭代使用3个单位的数据
  var type = gl.UNSIGNED_BYTE;   // 单位数据类型是无符号 8 位整数
  var normalize = true;  // 标准化数据 (从 0-255 转换到 0.0-1.0)
  var stride = 0;        // 0 = 移动距离 * 单位距离长度sizeof(type)  每次迭代跳多少距离到下一个数据
  var offset = 0;        // 从绑定缓冲的起始处开始
  gl.vertexAttribPointer(
    colorAttributeLocation, size, type, normalize, stride, offset);
  drawScene();
  function drawScene() {
    resizeCanvasToDisplaySize(gl.canvas);
    // 告诉WebGL如何从剪辑空间转换为像素
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // 清理画布
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // 不绘制背面三角形
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    // 告诉它使用我们的程序(对着色器)
    gl.useProgram(program);
    // 绑定我们想要的属性/缓冲集。
    gl.bindVertexArray(vao);


    // 设置光线方向
    // gl.uniform3fv(reverseLightDirectionLocation, m5.normalize([0.5, 0.7, 1]));

    // 设置颜色
    // gl.uniform4fv(colorLocation, color);
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var left = 0;
    var right = gl.canvas.clientWidth;
    var bottom = gl.canvas.clientHeight;
    var top = 0;
    var zNear = 1; // 近平面
    var zFar = 1000000; // 远平面

    // 计算矩阵
    var matrix = matrixM4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
    // var matrix = matrixM4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 4000);
    // matrix = glMatrix.mat4.orthoNO(matrix, left, right, bottom, top, zNear, zFar);
    matrix = matrixM4.translate(matrix, translation[0], translation[1], translation[2]);
    matrix = matrixM4.xRotate(matrix, rotation[0]);
    matrix = matrixM4.yRotate(matrix, rotation[1]);
    matrix = matrixM4.zRotate(matrix, rotation[2]);
    matrix = matrixM4.scale(matrix, scale[0], scale[1], scale[2]);
    // 设置矩阵
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    // 绘制
    // var primitiveType = gl.LINES;
    var primitiveType = Type == 'LINES' ? gl.LINES : gl.TRIANGLES;
    var offset = 0;
    var count = SourceData.length / 3;
    // var count = 16*6;
    gl.drawArrays(primitiveType, offset, count);
  }

}
// 顶点数组
function setGeometry(gl: any, SourceData: Array<number>) {
  // console.log(SourceData)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(SourceData),
    gl.STATIC_DRAW);
}
// 片元数组
function setColors(gl: any, colorData: Array<number>) {
  // console.log(colorData)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array(colorData),
    gl.STATIC_DRAW);
}
const matrixM4 = {
  projection: function (width: number, height: number, depth: number) {
    // 注意：这个矩阵翻转了 Y 轴，所以 0 在上方
    return [
      2 / width, 0, 0, 0,
      0, -2 / height, 0, 0,
      0, 0, 2 / depth, 0,
      -1, 1, 0, 1,
    ];
  },
  orthographic: function (out: Array<number>, left: number, right: number, bottom: number, top: number, near: number, far: number) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = near * nf;
    out[15] = 1;
    return out;
  },
  perspective: function (fieldOfViewInRadians: any, aspect: number, near: number, far: number) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);

    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  },
  translation: function (tx: number, ty: number, tz: number) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1]
  },

  xRotation: function (angleInRadians: any) {
    var c = Math.cos(angleInRadians)
    var s = Math.sin(angleInRadians)

    return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]
  },

  yRotation: function (angleInRadians: any) {
    var c = Math.cos(angleInRadians)
    var s = Math.sin(angleInRadians)

    return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]
  },

  zRotation: function (angleInRadians: any) {
    var c = Math.cos(angleInRadians)
    var s = Math.sin(angleInRadians)

    return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  },

  scaling: function (sx: number, sy: number, sz: number) {
    return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1]
  },
  translate: function (m: any, tx: any, ty: any, tz: any) {
    return matrixM4.multiply(m, matrixM4.translation(tx, ty, tz));
  },

  xRotate: function (m: any, angleInRadians: any) {
    return matrixM4.multiply(m, matrixM4.xRotation(angleInRadians));
  },

  yRotate: function (m: any, angleInRadians: any) {
    return matrixM4.multiply(m, matrixM4.yRotation(angleInRadians));
  },

  zRotate: function (m: any, angleInRadians: any) {
    return matrixM4.multiply(m, matrixM4.zRotation(angleInRadians));
  },

  scale: function (m: any, sx: number, sy: number, sz: number) {
    return matrixM4.multiply(m, matrixM4.scaling(sx, sy, sz));
  },
  multiply: function (a: any, b: any) {
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];

    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  },
}

export {
  init,
  // loadFile
}