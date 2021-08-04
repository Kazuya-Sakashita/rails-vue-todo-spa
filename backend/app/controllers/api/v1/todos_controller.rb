class Api::V1::TodosController < ApplicationController
    def index
      render json: { status: 200, todos: Todo.all, message: "success" }
    end
  
    def create
      todo = Todo.new(todo_params)
  
      if todo.save
        render json: { status: 200, todo: todo, message: "success" }
      else
        render json: { status: 500, todo: nil, message: todo.errors }
      end
    end
  
    def destroy
      todo = Todo.find(params[:id])
  
      if todo.destroy
        render json: { status: 200, todo: todo, message: "success" }
      else
        render json: { status: 500, todo: nil, message: todo.errors }
      end
    end
  
    private
  
      def todo_params
        params.require(:todo).permit(:title)
      end
  end