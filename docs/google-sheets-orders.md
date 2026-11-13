# Orders in Google Sheets: setup (10 minutes)

Every order placed on the site becomes a row in a Google Sheet. The admin page (`/admin`) and the
tracking page read from it, and changing a status in admin updates the sheet. You can also change
the **status** column directly in the sheet using its dropdown.

## 1. Create the sheet + script
1. Go to sheets.google.com → **Blank spreadsheet**. Name it e.g. `OMNIS – Commandes`.
2. Menu **Extensions → Apps Script**.
3. Delete the sample code, paste the whole content of [`scripts/google-sheets/orders.gs`](../scripts/google-sheets/orders.gs), click 💾 **Save**.

## 2. Set the secret
1. Generate a long random string (or ask Claude to generate one), e.g. 40 characters.
2. In Apps Script: ⚙️ **Project Settings → Script properties → Add script property**
   - Property: `SECRET`
   - Value: your random string
3. **Save script properties**.

## 3. Deploy as a web app
1. **Deploy → New deployment** → ⚙️ type **Web app**.
2. Description: `orders`. **Execute as: Me**. **Who has access: Anyone**.
   (Safe: every request must carry the secret, otherwise it's refused.)
3. **Deploy** → **Authorize access** → choose your Google account → *Advanced → Go to project (unsafe)* → **Allow**.
   That warning is normal for your own script.
4. Copy the **Web app URL** (ends with `/exec`).

## 4. Connect the website
Add these to `.env.local` (local) **and** to your host's environment variables (Vercel → Settings → Environment Variables):

```
ORDERS_SHEET_URL=https://script.google.com/macros/s/XXXXXXXX/exec
ORDERS_SHEET_SECRET=the-same-random-string-as-in-step-2
```

Restart the dev server / redeploy. Place a test order. A tab **Commandes** appears with headers and your order.

## Notes
- **Columns:** id · date · status · name · phone · governorate · city · address · notes · products · quantity ·
  subtotal · delivery · total · payment · utm_source/medium/campaign/content/term · itemsJson.
  The UTM columns show which ad/creative brought each order. Don't rename the headers or the tab,
  and don't edit `itemsJson`.
- **Changing the script later:** after editing code, use **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**
  so the same URL keeps working.
- **If the sheet is unreachable,** the customer sees an error with a "send on WhatsApp" fallback.
  No fake "order confirmed".
- **Without these variables** the site falls back to `src/data/orders.json`, which is fine on your computer
  but loses orders on Vercel.
- **Speed:** each order takes ~1–2 s to write. Fine for hundreds of orders a day.
