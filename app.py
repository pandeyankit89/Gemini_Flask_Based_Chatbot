from flask import Flask, render_template, request, jsonify
import requests
import os
import google.generativeai as genai

app = Flask(__name__)

API_KEY = os.getenv("LLM_API_KEY")  # Store it in .env or directly paste for now. pip install python-dotenv

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# Shared chat session (memory) for the app
chat_session = model.start_chat(history=[])

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    user_input = f"Answer question, {user_input}, while response Only give Answer"
    print(f"user_input : {user_input}")
    try:
        response = chat_session.send_message(user_input)
        print(f"response : {response.text}")
        return jsonify({'reply': response.text})
    except Exception as e:
        return jsonify({'reply': f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    #app.run(debug=True)
    app.run(debug=True)

