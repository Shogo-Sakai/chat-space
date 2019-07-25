class UsersController < ApplicationController
  
  def edit
  end

  def update
    if current_user.update(edit_params)
      redirect_to root_path
    else
      render:edit
    end
  end

  private
  def edit_params
    params.require(:user).permit(:email, :name)
  end
end
