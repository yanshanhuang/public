# In this example, we'll create a simple fireworks art using Python

import random
import turtle

screen = turtle.Screen()
screen.bgcolor('black')

def create_firework():
    colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white']
    size = random.randint(10, 50)
    x = random.randint(-200, 200)
    y = random.randint(-200, 200)
    color = random.choice(colors)

    pen = turtle.Turtle()
    pen.speed(0)
    pen.penup()
    pen.goto(x, y)
    pen.pendown()
    pen.color(color)

    for _ in range(36):
        pen.forward(size)
        pen.backward(size)
        pen.right(10)

    pen.penup()
    pen.hideturtle()

# Create 10 fireworks
for _ in range(10):
    create_firework()

turtle.done()
