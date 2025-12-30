from ailydian_client import AILYDIANBackend

backend = AILYDIANBackend(project_id="travel.ailydian.com")
print("Backend connected:", backend.project_id)
