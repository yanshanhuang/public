import turtle
import random

# 创建画布和画笔
canvas = turtle.Screen()
canvas.bgcolor("white")
pen = turtle.Turtle()

# 设置画笔速度和颜色
pen.speed(10)
colors = ["red", "blue", "green", "orange", "purple"]

# 绘制随机图形
for _ in range(50):
    # 生成随机位置和大小
    x = random.randint(-200, 200)
    y = random.randint(-200, 200)
    size = random.randint(10, 100)

    # 生成随机颜色
    color = random.choice(colors)

    # 移动画笔到指定位置
    pen.penup()
    pen.goto(x, y)
    pen.pendown()

    # 设置画笔颜色和填充颜色
    pen.color(color)
    pen.fillcolor(color)

    # 绘制图形
    pen.begin_fill()
    for _ in range(4):
        pen.forward(size)
        pen.right(90)
    pen.end_fill()

# 隐藏画笔
pen.hideturtle()

# 结束绘图
turtle.done()
