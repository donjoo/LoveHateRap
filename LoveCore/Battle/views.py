import openai
from django.conf import settings
from django.http import JsonResponse


openai.api_key = settings.OPEN_API_KEY

def generate_response(prompt,mode):
    if mode == "rap":
        prompt = f"Generate a cringe-worthy Valentine's rap verse: {prompt}"
    elif mode == "argument":
        prompt = f"Debate this topic {prompt}"
    elif mode == "flirt":
        prompt = f"Generate  a flirty  message and a rejection response: {prompt}"
        

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt = prompt,
        max_tokens=100
    )

    return response.choices[0].text.strip()




def bot_response(request):
    mode = request.GET.get('mode')
    prompt = request.GET.get('prompt')
    response = generate_response(mode,prompt)
    return JsonResponse({'response':response})

