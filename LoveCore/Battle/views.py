import openai
from django.conf import settings
from django.http import JsonResponse



def generate_response(prompt,mode):
    if mode == "rap":
        prompt = f"Generate a cringe-worthy Valentine's rap verse: {prompt}"
    elif mode == "argument":
        prompt = f"Debate this topic {prompt}"
    elif mode == "flirt":
        prompt = f"Generate  a flirty  message and a rejection response: {prompt}"

    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Hello!"}
        ]
    )

    return response.choices[0].text.strip()




def bot_response(request):
    mode = request.GET.get('mode')
    prompt = request.GET.get('prompt')
    response = generate_response(mode,prompt)
    return JsonResponse({'response':response})

