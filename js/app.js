// 此为游戏必须的函数，用来在屏幕上画出玩家&敌人，
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Object.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
}

// 1.敌人类
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
	this.x=x;
	this.y=y;
	this.speed = Math.floor((Math.random() * 200) + 100);
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
	if (this.x<=505)
	{this.x+=this.speed*dt;}
	else
	{this.x=-50;}

	//发生碰撞
	if(player.x>=this.x-30 && player.x<=this.x+30){
		if(player.y>=this.y-30 && player.y<=this.y+30)
		{this.reset();}
	}
};


// 2.玩家类
// 这个类需要一个 update() 函数， render() 函数(render已在Object.prototype中定义)和一个 handleInput()函数
var Player = function() {

    // 玩家的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/char-boy.png';
	this.x=200;
	this.y=400;
};

//update()函数
Player.prototype.update = function(){
	//向上
	if (this.direction === 'up'){this.y-=50;}
	//向下
	else if (this.y!=400 && this.direction === 'down'){this.y+=50;}
	//向左
	else if (this.x>0 && this.direction === 'left'){this.x-=50;}
	//向右
	else if (this.x!=400 && this.direction === 'right'){this.x+=50;}
	this.direction=null;
	
	//碰到水了则重置
	if(this.y<25){this.reset();}
}

//handleInput()函数
Player.prototype.handleInput = function(e)
{this.direction=e;} 



// 3.实例化
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
(function setEnemies(){
	allEnemies.push(new Enemy(-2,60));
	allEnemies.push(new Enemy(-2,120));
	allEnemies.push(new Enemy(-2,180));
	allEnemies.push(new Enemy(-2,240));
}())


// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);//keyCode是数字, e是方向
});
