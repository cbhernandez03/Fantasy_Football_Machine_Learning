document.addEventListener('DOMContentLoaded', () => {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const submitButton = document.getElementById('submit-rankings');
  const playerInfoContainer = document.getElementById('player-info-container');
  const playerInfoTable = document.getElementById('player-info-table');
  const playerInfoTextarea = document.getElementById('player-info');

  submitButton.addEventListener('click', () => {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (firstName !== '' && lastName !== '') {
      const playerName = `${firstName} ${lastName}`;
      console.log('Searching for:', playerName); // Added console log statement
      getPlayerInfo(playerName);
    }
  });

  function getPlayerInfo(playerName) {
    fetch('Prediction2023.csv')
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n');
        const headers = rows[0].split(',');

        let playerInfoHTML = '';

        for (let i = 1; i < rows.length; i++) {
          const cells = rows[i].split(',');

          if (cells[0] === playerName) {
            playerInfoHTML += '<tr>';
            for (let j = 0; j < headers.length; j++) {
              playerInfoHTML += `<th>${headers[j]}</th>`;
            }
            playerInfoHTML += '</tr>';
            
            playerInfoHTML += '<tr>';
            for (let j = 0; j < cells.length; j++) {
              playerInfoHTML += `<td>${cells[j]}</td>`;
            }
            playerInfoHTML += '</tr>';

            break;
          }
        }

        if (playerInfoHTML !== '') {
          playerInfoTable.innerHTML = playerInfoHTML;
          playerInfoContainer.style.display = 'block';
        } else {
          playerInfoContainer.style.display = 'none';
          playerInfoTextarea.value = 'Player not found.';
          playerInfoContainer.style.display = 'block';
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }



  const buttons = document.querySelectorAll('.my-button');
  const responseContainer = document.getElementById('response-container');
  const aboutButton = document.getElementById('about');
  const aboutResponseContainer = document.getElementById('about-response');
  const searchForm = document.getElementById('search'); // Changed the variable name to searchForm

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonId = button.getAttribute('id');

      switch (buttonId) {
        case 'quarterback':
          responseContainer.innerHTML = '<div class="dynamic-response">Quarterback Ranks</div>';
          break;
        case 'runningback':
          responseContainer.innerHTML = '<div class="dynamic-response">Running Back Ranks</div>';
          break;
        case 'widereceiver':
          responseContainer.innerHTML = '<div class="dynamic-response">Wide Receiver Ranks</div>';
          break;
        case 'tightend':
          responseContainer.innerHTML = '<div class="dynamic-response">Tight End Ranks</div>';
          break;
        case 'overall':
          responseContainer.innerHTML = '<div class="dynamic-response">Overall Ranks</div>';
          break;
        default:
          responseContainer.innerHTML = '';
      }

      responseContainer.classList.remove('hidden');
    });
  });

  aboutButton.addEventListener('click', () => {
    aboutResponseContainer.innerHTML = `
      <div class="dynamic-response about-text">
        <p>Linear regression is a simple yet powerful algorithm used in machine learning for predicting numerical values based on historical data. In the context of predicting fantasy scores for the next season, Linear Regression can be used to estimate the relationship between various features (such as player performance statistics, team data, or other relevant factors) and the fantasy scores.</p>
        <p>Here are some reasons why you might use Linear Regression for this task:</p>
        <ul>
          <li>Simplicity: Linear Regression is a straightforward algorithm that is easy to understand and implement. It provides a good starting point for modeling the relationship between input features and the target variable.</li>
          <li>Interpretability: Linear Regression produces coefficients that can be interpreted as the impact of each feature on the predicted fantasy score. This can help in understanding the relative importance of different factors and making informed decisions.</li>
          <li>Linearity assumption: Linear Regression assumes a linear relationship between the input features and the target variable. If you believe there is a linear relationship between the features and fantasy scores, Linear Regression can be an appropriate choice.</li>
        </ul>
        <p>To assess the performance of your Linear Regression model, you would typically import mean_squared_error from the appropriate library, such as scikit-learn in Python. Mean squared error (MSE) is a common metric used to evaluate regression models. It measures the average squared difference between the predicted and actual values. By minimizing the MSE, you aim to improve the accuracy of your fantasy score predictions.</p>
        <p>Keep in mind that Linear Regression may have limitations when dealing with complex relationships or when non-linear patterns exist in the data. In such cases, you may need to explore more advanced techniques or consider other algorithms, such as decision trees, random forests, or neural networks.</p>
      </div>
    `;

    aboutResponseContainer.classList.remove('hidden');
  });
});