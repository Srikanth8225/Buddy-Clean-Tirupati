import sys
from PIL import Image

def remove_white_bg(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Check if pixel is white or very close to white
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0)) # transparent
            else:
                newData.append(item)
                
        img.putdata(newData)
        
        # Save as PNG for logo
        img.save(output_path, "PNG")
        
        # Save as ICO for favicon
        # Try copying the logo to favicon.ico as well
        icon_size = (32, 32)
        favicon_img = img.resize(icon_size, Image.Resampling.LANCZOS)
        favicon_img.save(r"D:\workspace\Buddy-Clean-Tirupati\public\favicon.ico", format="ICO", sizes=[(32, 32)])
        
        # Nextjs app directory convention for favicon:
        favicon_img.save(r"D:\workspace\Buddy-Clean-Tirupati\src\app\favicon.ico", format="ICO", sizes=[(32, 32)])
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

input_image = r"C:\Users\ganes\.gemini\antigravity\brain\7c8e2359-8386-4445-9212-46de01976fea\.user_uploaded\media__1784545770673.jpg"
output_image = r"D:\workspace\Buddy-Clean-Tirupati\public\logo.png"

remove_white_bg(input_image, output_image)
