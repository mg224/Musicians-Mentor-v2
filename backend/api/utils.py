import os
import uuid
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

STORAGE_BUCKET = os.environ.get("STORAGE_BUCKET")
MAX_FILE_SIZE = 5 * 1024 * 1024 # 5 MB
ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

def upload_to_supabase_storage(file):
    try:
        if file.size > MAX_FILE_SIZE:
            return False, f"File too large. Maximum size is {MAX_FILE_SIZE // (1024*1024)}MB"
        
        if file.content_type not in ALLOWED_IMAGE_TYPES:
            return False, f"Invalid file type. Allowed types: {', '.join(ALLOWED_IMAGE_TYPES)}"
        
        file_extension = os.path.splitext(file.name)[1].lower()
        unique_filename = f"{uuid.uuid4()}{file_extension}"

        file.seek(0)
        file_content = file.read()

        response = supabase.storage.from_(STORAGE_BUCKET).upload(
            path=unique_filename,
            file=file_content,
            file_options={
                "content-type": file.content_type,
                "cache-control": "3600"
            }
        )

        if hasattr(response, "error") and response.error:
            return False, f"Upload failed: {response.error}"
        
        public_url = supabase.storage.from_(STORAGE_BUCKET).get_public_url(unique_filename)

        return True, public_url
    
    except Exception as e:
        return False, f"Upload error: {str(e)}"

def delete_from_supabase_storage(file_url):
    try:
        filename = extract_filename_from_url(file_url)

        if not filename:
            return False, "Could not extract filename from URL"
        
        response = supabase.storage.from_(STORAGE_BUCKET).remove([filename])

        if hasattr(response, "error") and response.error:
            return False, f"Delete failed: {response.error}"
        
        return True, "Deleted successfully"

    except Exception as e:
        return False, f"Delete error: {str(e)}"
    
def extract_filename_from_url(file_url):
    try:
        parts = file_url.split("/")
        if len(parts) > 0:
            return parts[-1]
        return ""
    except:
        return ""