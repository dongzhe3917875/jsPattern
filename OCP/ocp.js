function questionGenerator(spec, my) {
  var that = {};
  var my = my || {};
  my.label = spec.label;
  that.render = function() {
    var questionWrapper = document.createElement('div');
    questionWrapper.className = 'question';

    var questionLabel = document.createElement('div');
    questionLabel.className = 'question-label';
    var label = document.createTextNode(spec.label);
    questionLabel.appendChild(label);

    var answer = my.renderInput();
    console.log(answer)
    // 该render方法是同样的粗合理代码
    // 唯一的不同就是上面的一句my.renderInput()
    // 因为不同的问题类型有不同的实现

    questionWrapper.appendChild(questionLabel);
    questionWrapper.appendChild(answer);
    return questionWrapper;
  }
  return that;
}
function choiceQuestionCreater(spec) {
  var my = {};
  my.renderInput = function() {
    var input = document.createElement('select');
    var len = spec.choices.length;
    for (var i = 0; i < len; i++) {
      var option = document.createElement('option');
      option.text = spec.choices[i];
      option.value = spec.choices[i];
      input.appendChild(option);
    }
    return input
  }
  var that = questionGenerator(spec, my);
  return that;
}

function inputQuestionCreater(spec) {
  var my = {};
  my.renderInput = function() {
    var input = document.createElement('input');
    input.type = 'text';
    return input;
  };
  var that = questionGenerator(spec, my);
  return that;
}

view = (function(){
  return {
    render: function(target, questions) {
      for (var i = 0; i < questions.length; i++) {
        target.appendChild(questions[i].render());
      }
    }
  }
})();

questions = [choiceQuestionCreater({
  label: 'Have you used tobacco products within the last 30 days?',
  choices: ['Yes', 'No']
}), inputQuestionCreater({
  label: 'What medications are you currently using?'
})]

view.render(document.getElementById("wrapper"), questions);
