from pathlib import Path

readme = r'''<div align="center">

# CONTEXT BRIDGE

### Carry the conversation. Keep the context.

**A local-first Chrome extension for turning long ChatGPT conversations into clean, portable handoff packages.**

[English](#english) · [Tiếng Việt](#tiếng-việt)

<br>

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension_MV3-4285F4?logo=googlechrome&logoColor=white)
![Local First](https://img.shields.io/badge/Privacy-Local_First-1f883d)
![No Backend](https://img.shields.io/badge/Backend-Not_Required-24292f)
![Bilingual](https://img.shields.io/badge/UI-English_%2F_Vietnamese-7c3aed)
![License](https://img.shields.io/badge/License-Nguyen_Khang_Proprietary-red)

<br>

**Built by Nguyen Khang**

[GitHub](https://github.com/khangkhangkhan-g) ·
[Facebook](https://facebook.com/ngkph.m) ·
[Instagram](https://instagram.com/ngkpham) ·
[Email](mailto:nguyenkhangpham1306@gmail.com)

</div>

---

# English

## What is Context Bridge?

Long AI conversations are useful until you need to move them somewhere else.

A conversation may contain decisions, code, tables, links, files, screenshots, requirements, revisions, and dozens of small details that are easy to lose when you start a new chat or hand the work to someone else.

**Context Bridge turns that conversation into a portable project package.**

Instead of manually copying hundreds of messages, Context Bridge scans the conversation, organizes the useful content, and exports a structured ZIP that can be archived, reviewed, or used as a handoff for the next session.

> **Scan the conversation → Export the context → Continue without rebuilding everything from zero.**

---

## Why Context Bridge?

Most conversation exporters focus on saving what happened.

Context Bridge is designed around a different question:

### "How do I continue from here?"

The goal is not only to archive a chat, but to preserve enough structure for the next person, project, or AI session to understand what happened and what should happen next.

---

## Core Features

| Feature | What it does |
| --- | --- |
| **Conversation Scan** | Reads the current ChatGPT conversation and reconstructs its message history. |
| **Conversation-data first** | Uses available conversation data when possible, with DOM-based capture as a fallback. |
| **Structured Export** | Separates messages, handoff context, archives, metadata, and extracted outputs instead of producing one giant text dump. |
| **CONTINUE.md** | Generates a deterministic handoff file designed to help continue the work in another session. |
| **Typed Output Capture** | Preserves text, code blocks, tables, links, images, and attached/generated files when available. |
| **HTML Archive** | Creates a high-fidelity readable archive of the conversation. |
| **Structured JSON** | Keeps machine-readable conversation information for later processing or development. |
| **Local-first** | Processing happens through the extension. No separate Context Bridge backend or account is required. |
| **No private ChatGPT API required** | The extension does not require you to obtain or configure a private ChatGPT API key. |
| **English / Vietnamese UI** | The extension interface supports both English and Vietnamese workflows. |

---

## How It Works

```text
┌──────────────────────┐
│  ChatGPT Conversation│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Context Bridge     │
│                     │
│  Scan + Reconstruct │
│  Extract + Organize │
│  Build Handoff      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────┐
│         Exported ZIP         │
│                              │
│  CONTINUE.md                 │
│  messages / structured data  │
│  HTML archive                │
│  extracted outputs           │
│  metadata                    │
└──────────────────────────────┘
```

---

## Quick Start

### 1. Download Context Bridge

Clone the repository:

```bash
git clone https://github.com/khangkhangkhan-g/context-bridge.git
```

Or download the repository as a ZIP from GitHub and extract it.

### 2. Open Chrome Extensions

In Chrome, open:

```text
chrome://extensions
```

### 3. Enable Developer Mode

Turn on **Developer mode** in the top-right corner.

### 4. Load the Extension

Click:

```text
Load unpacked
```

Select the Context Bridge extension folder containing `manifest.json`.

### 5. Open a ChatGPT Conversation

Open the conversation you want to preserve.

For long conversations, make sure the full conversation has been loaded before scanning. Context Bridge also provides a pre-scan reminder for this.

### 6. Scan

Open Context Bridge and select:

```text
Scan Chat
```

The extension reconstructs the conversation and detects supported content.

### 7. Export

Select:

```text
Export ZIP
```

Context Bridge generates the portable package locally.

---

## What Is Inside the Export?

The exact contents can vary depending on the conversation, but a Context Bridge package is designed around a structure similar to:

```text
context-bridge-export/
│
├── CONTINUE.md
├── archive/
│   └── conversation.html
│
├── messages/
│   ├── messages.json
│   └── structured-data.json
│
├── outputs/
│   ├── text/
│   ├── code/
│   ├── tables/
│   ├── links/
│   ├── images/
│   └── files/
│
└── metadata/
```

### `CONTINUE.md`

This is the most important handoff file.

Use it when:

- starting a new chat
- continuing work in another AI session
- handing a project to another person
- documenting the current project state
- preserving key context before a conversation becomes too large

### HTML Archive

The HTML archive is intended for human-readable preservation and higher-fidelity review of the original conversation.

### Structured Data

JSON output makes the export useful beyond simple archiving. It can be inspected, processed, indexed, or used as input for future tools.

---

## Example Workflow

You have spent several days building a project with ChatGPT.

The conversation contains:

```text
Requirements
↓
Several implementation attempts
↓
Bug fixes
↓
Design decisions
↓
Code
↓
Files
↓
Final working version
↓
New tasks still remaining
```

Normally, moving to a fresh conversation means manually explaining all of that again.

With Context Bridge:

```text
Open old conversation
        ↓
Scan Chat
        ↓
Export ZIP
        ↓
Open CONTINUE.md
        ↓
Attach or provide the handoff in the next session
        ↓
Continue the project
```

The objective is simple:

> **Less reconstruction. Less context loss. Faster continuation.**

---

## Captured Content

Context Bridge is designed to preserve more than plain chat text.

Supported or targeted conversation content includes:

- User messages
- Assistant messages
- Text responses
- Code blocks
- Tables
- Links
- Conversation metadata
- Images exposed through supported conversation data
- User attachments
- Generated attachments
- Structured conversation data

Availability can depend on what the current page exposes to the browser.

---

## Privacy

Context Bridge is designed as a **local-first tool**.

It does not require:

- a separate Context Bridge account
- a Context Bridge cloud backend
- a private ChatGPT API key
- uploading your conversation to a separate Context Bridge service

Your exported package should still be treated as private data because it may contain the same sensitive information as the original conversation.

**Review an export before sharing it publicly.**

---

## Use Cases

### Development

Preserve architecture decisions, code iterations, bug fixes, and implementation context before moving to a clean conversation.

### Research

Keep sources, reasoning context, notes, tables, and generated material together in one portable package.

### Long-running AI Projects

Move between sessions without repeatedly rebuilding project context.

### Collaboration

Give another person a structured handoff instead of sending screenshots or an enormous chat transcript.

### Personal Archive

Keep readable and machine-processable copies of important conversations.

---

## Tips for Better Exports

1. Open the correct conversation before scanning.
2. Allow long conversations to load fully.
3. Run **Scan Chat** before exporting.
4. Review the generated handoff before using it for a critical project.
5. Keep the original ZIP as an untouched archive.
6. Use `CONTINUE.md` as the starting point for continuation, not as a replacement for every original artifact.

---

## Current Design Philosophy

Context Bridge follows a few simple principles:

```text
LOCAL FIRST
    +
STRUCTURED
    +
PORTABLE
    +
HUMAN READABLE
    +
MACHINE READABLE
    =
CONTEXT THAT CAN ACTUALLY MOVE
```

It is deliberately not designed as another chatbot.

Its job is to help **bridge the state between conversations**.

---

## Project Status

Context Bridge is actively evolving.

The current version focuses on:

- reliable conversation reconstruction
- structured exports
- better attachment and image capture
- stable handoff generation
- clearer scan status
- bilingual interaction
- improved handling of long conversations

Because ChatGPT's web interface can change over time, browser-side capture logic may occasionally require updates.

---

## Contributing

Ideas, testing, bug reports, and technical feedback are welcome.

If you find a conversation type that Context Bridge does not capture correctly, include:

```text
Browser version
Extension version
What type of content was missing
Whether the conversation was fully loaded
Steps to reproduce the issue
```

Please do **not** include private conversation content in a public issue unless you intentionally want it to be public.

---

## About the Creator

### Nguyen Khang

I build small tools around real workflow problems, especially where repetitive manual work can be replaced by cleaner systems and automation.

Context Bridge started from a simple frustration:

**A useful AI conversation should not become disposable just because you need to start a new one.**

The project explores a more practical way to preserve, organize, and carry that working context forward.

### Connect

- **GitHub:** [khangkhangkhan-g](https://github.com/khangkhangkhan-g)
- **Facebook:** [Nguyen Khang](https://facebook.com/ngkph.m)
- **Instagram:** [@ngkpham](https://instagram.com/ngkpham)
- **Email:** [nguyenkhangpham1306@gmail.com](mailto:nguyenkhangpham1306@gmail.com)

---

## License

Copyright © 2026 **Nguyen Khang**. All Rights Reserved.

Context Bridge is distributed under the **Nguyen Khang Proprietary License**.

You may inspect and use the project only under the permissions granted by the repository's `LICENSE` file.

No permission is automatically granted to redistribute, sell, relicense, commercially exploit, or claim ownership of this project or modified versions of it.

See [`LICENSE`](./LICENSE) for the complete terms.

---

# Tiếng Việt

## Context Bridge là gì?

Một cuộc trò chuyện AI dài có thể chứa rất nhiều thứ quan trọng:

- yêu cầu ban đầu
- các quyết định đã chốt
- code
- bảng
- link
- file
- hình ảnh
- những lần sửa lỗi
- các phiên bản đã thử
- những việc vẫn còn dang dở

Vấn đề xuất hiện khi bạn cần chuyển sang một cuộc trò chuyện mới.

Thông thường, bạn phải giải thích lại gần như toàn bộ dự án từ đầu.

**Context Bridge được tạo ra để giải quyết đúng vấn đề đó.**

Extension quét cuộc trò chuyện hiện tại, tổ chức lại dữ liệu và xuất thành một gói ZIP có cấu trúc để bạn có thể lưu trữ, kiểm tra hoặc dùng làm context bàn giao cho phiên làm việc tiếp theo.

> **Quét cuộc trò chuyện → Xuất context → Tiếp tục mà không phải dựng lại mọi thứ từ đầu.**

---

## Context Bridge khác gì một công cụ export chat thông thường?

Một công cụ export thông thường chủ yếu trả lời câu hỏi:

> "Cuộc trò chuyện trước đó có gì?"

Context Bridge tập trung vào câu hỏi:

> **"Bây giờ tôi tiếp tục từ đây như thế nào?"**

Mục tiêu không chỉ là lưu transcript.

Mục tiêu là tạo ra một **handoff package** đủ rõ ràng để người khác, một phiên AI mới hoặc chính bạn trong tương lai có thể hiểu trạng thái hiện tại của công việc.

---

## Tính năng chính

| Tính năng | Công dụng |
| --- | --- |
| **Conversation Scan** | Quét và tái dựng lịch sử của cuộc trò chuyện ChatGPT đang mở. |
| **Conversation-data first** | Ưu tiên dữ liệu conversation khi có thể và dùng DOM capture làm phương án fallback. |
| **Structured Export** | Tách message, handoff, archive, metadata và output thay vì đổ tất cả vào một file text khổng lồ. |
| **CONTINUE.md** | Tạo file bàn giao có cấu trúc để tiếp tục công việc trong phiên tiếp theo. |
| **Typed Output Capture** | Giữ lại text, code block, bảng, link, ảnh và file khi nguồn dữ liệu cho phép. |
| **HTML Archive** | Tạo bản lưu dễ đọc với độ trung thực cao hơn so với plain text. |
| **Structured JSON** | Lưu dữ liệu dạng máy đọc được để có thể xử lý hoặc phát triển tiếp. |
| **Local-first** | Không cần backend riêng của Context Bridge. |
| **Không cần private ChatGPT API** | Không cần tự cấu hình API key ChatGPT để sử dụng extension. |
| **English / Vietnamese UI** | Giao diện hỗ trợ quy trình bằng tiếng Anh và tiếng Việt. |

---

## Cách hoạt động

```text
┌───────────────────────┐
│ Conversation ChatGPT │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│    Context Bridge     │
│                       │
│  Scan + Reconstruct   │
│  Extract + Organize   │
│  Build Handoff        │
└───────────┬───────────┘
            │
            ▼
┌──────────────────────────────┐
│          File ZIP            │
│                              │
│  CONTINUE.md                 │
│  messages / structured data  │
│  HTML archive                │
│  extracted outputs           │
│  metadata                    │
└──────────────────────────────┘
```

---

## Cài đặt và sử dụng

### Bước 1 - Tải Context Bridge

Clone repository:

```bash
git clone https://github.com/khangkhangkhan-g/context-bridge.git
```

Hoặc chọn **Code → Download ZIP** trên GitHub rồi giải nén.

### Bước 2 - Mở trang Extension của Chrome

Nhập:

```text
chrome://extensions
```

### Bước 3 - Bật Developer Mode

Bật **Developer mode** ở góc trên bên phải.

### Bước 4 - Load Extension

Chọn:

```text
Load unpacked
```

Sau đó chọn folder Context Bridge có file `manifest.json`.

### Bước 5 - Mở conversation cần lưu

Mở đúng conversation ChatGPT mà bạn muốn export.

Nếu conversation rất dài, hãy đảm bảo toàn bộ nội dung đã được load trước khi scan. Context Bridge cũng có cảnh báo trước khi quét để nhắc bước này.

### Bước 6 - Scan

Mở Context Bridge và chọn:

```text
Scan Chat
```

Extension sẽ đọc và tái dựng nội dung conversation.

### Bước 7 - Export

Chọn:

```text
Export ZIP
```

Context Bridge sẽ tạo package để bạn lưu lại hoặc dùng cho phiên tiếp theo.

---

## Bên trong file export có gì?

Cấu trúc thực tế có thể thay đổi tùy conversation, nhưng package được thiết kế theo hướng:

```text
context-bridge-export/
│
├── CONTINUE.md
├── archive/
│   └── conversation.html
│
├── messages/
│   ├── messages.json
│   └── structured-data.json
│
├── outputs/
│   ├── text/
│   ├── code/
│   ├── tables/
│   ├── links/
│   ├── images/
│   └── files/
│
└── metadata/
```

### `CONTINUE.md`

Đây là file quan trọng nhất nếu mục tiêu của bạn là **tiếp tục công việc**.

Có thể dùng khi:

- chuyển sang chat mới
- tiếp tục dự án ở phiên AI khác
- bàn giao dự án cho người khác
- lưu trạng thái hiện tại của một project
- tránh mất context khi conversation đã quá dài

### HTML Archive

Dùng để đọc lại conversation dưới dạng archive trực quan hơn.

### Structured Data

Các file JSON giúp dữ liệu không chỉ dành cho con người đọc mà còn có thể được xử lý tiếp bằng script hoặc các công cụ khác.

---

## Ví dụ thực tế

Bạn đã làm một project với AI trong nhiều ngày.

Conversation hiện tại chứa:

```text
Brief
↓
Yêu cầu
↓
Các phương án đã thử
↓
Code
↓
Bug
↓
Fix
↓
Quyết định thiết kế
↓
File
↓
Phiên bản hiện tại
↓
Các task chưa hoàn thành
```

Nếu mở chat mới theo cách thông thường, bạn phải kể lại gần như toàn bộ.

Với Context Bridge:

```text
Mở conversation cũ
        ↓
Scan Chat
        ↓
Export ZIP
        ↓
Mở CONTINUE.md
        ↓
Đưa handoff vào phiên tiếp theo
        ↓
Tiếp tục project
```

Mục tiêu:

> **Ít giải thích lại hơn. Ít mất context hơn. Tiếp tục công việc nhanh hơn.**

---

## Nội dung có thể được capture

Context Bridge được thiết kế để xử lý nhiều hơn plain text:

- Message của user
- Message của assistant
- Text
- Code block
- Table
- Link
- Metadata
- Image khi conversation data cho phép truy cập
- File user đã upload
- File được tạo trong conversation
- Structured conversation data

Khả năng capture cụ thể vẫn phụ thuộc vào dữ liệu mà trang hiện tại cung cấp cho browser.

---

## Privacy

Context Bridge đi theo hướng **local-first**.

Bạn không cần:

- tài khoản Context Bridge riêng
- cloud backend riêng của Context Bridge
- private ChatGPT API key
- upload toàn bộ conversation lên một Context Bridge server riêng

Tuy nhiên, file export có thể chứa cùng dữ liệu riêng tư với conversation gốc.

**Luôn kiểm tra file trước khi gửi cho người khác hoặc upload công khai.**

---

## Context Bridge phù hợp với ai?

### Developer

Giữ lại architecture decision, code, bug fix và lịch sử implementation khi chuyển sang conversation mới.

### Researcher / Student

Lưu nguồn, ghi chú, bảng, output và context nghiên cứu trong cùng một package.

### Người dùng AI cho project dài hạn

Không phải dựng lại project context mỗi lần chat trở nên quá dài.

### Team / Collaboration

Bàn giao bằng một package có cấu trúc thay vì gửi hàng chục screenshot hoặc một transcript khổng lồ.

### Personal Archive

Lưu những conversation quan trọng ở cả dạng dễ đọc và dạng machine-readable.

---

## Mẹo để export tốt hơn

1. Kiểm tra bạn đang mở đúng conversation.
2. Với chat dài, đảm bảo nội dung đã được load đầy đủ.
3. Chạy **Scan Chat** trước khi export.
4. Kiểm tra handoff nếu project có dữ liệu quan trọng.
5. Giữ lại file ZIP gốc như một bản archive.
6. Dùng `CONTINUE.md` để khởi động phiên tiếp theo, nhưng vẫn giữ các file gốc khi chúng cần thiết cho project.

---

## Triết lý của project

```text
LOCAL FIRST
    +
STRUCTURED
    +
PORTABLE
    +
HUMAN READABLE
    +
MACHINE READABLE
    =
CONTEXT CÓ THỂ THỰC SỰ ĐƯỢC MANG ĐI
```

Context Bridge không cố trở thành một chatbot khác.

Nó tồn tại để **nối trạng thái công việc giữa các conversation**.

---

## Trạng thái phát triển

Context Bridge vẫn đang được phát triển.

Trọng tâm hiện tại gồm:

- conversation reconstruction ổn định hơn
- structured export
- capture file và image tốt hơn
- handoff rõ ràng hơn
- trạng thái scan trực quan hơn
- English / Vietnamese UI
- xử lý conversation dài tốt hơn

Do giao diện web của ChatGPT có thể thay đổi, logic capture phía browser đôi khi cũng sẽ cần được cập nhật.

---

## Đóng góp và báo lỗi

Bug report, test case và feedback kỹ thuật đều được chào đón.

Khi báo lỗi, nên cung cấp:

```text
Browser version
Extension version
Loại nội dung bị thiếu
Conversation đã load đầy đủ hay chưa
Các bước để tái hiện lỗi
```

Không nên đăng nội dung conversation riêng tư lên public issue nếu bạn không chủ động muốn công khai dữ liệu đó.

---

## Về tác giả

### Nguyen Khang

Tôi thích xây những công cụ nhỏ để giải quyết các vấn đề workflow thực tế, đặc biệt là những tác vụ thủ công lặp lại có thể được thay thế bằng một hệ thống rõ ràng hơn.

Context Bridge bắt đầu từ một vấn đề rất đơn giản:

**Một cuộc trò chuyện AI hữu ích không nên trở thành thứ bỏ đi chỉ vì bạn cần mở một conversation mới.**

Project này là cách tôi thử giải quyết việc lưu, tổ chức và mang context làm việc sang phiên tiếp theo theo một cách thực dụng hơn.

### Liên hệ

- **GitHub:** [khangkhangkhan-g](https://github.com/khangkhangkhan-g)
- **Facebook:** [Nguyen Khang](https://facebook.com/ngkph.m)
- **Instagram:** [@ngkpham](https://instagram.com/ngkpham)
- **Email:** [nguyenkhangpham1306@gmail.com](mailto:nguyenkhangpham1306@gmail.com)

---

## License

Copyright © 2026 **Nguyen Khang**. All Rights Reserved.

Context Bridge được phát hành theo **Nguyen Khang Proprietary License**.

Quyền sử dụng project phụ thuộc vào các điều khoản trong file `LICENSE` của repository.

Không mặc định cho phép redistribute, bán, relicense, khai thác thương mại hoặc nhận quyền sở hữu đối với project hay phiên bản chỉnh sửa của project.

Xem [`LICENSE`](./LICENSE) để biết đầy đủ điều khoản.

---

<div align="center">

## Bridge the context. Continue the work.

**Context Bridge**

Made by **Nguyen Khang** · 2026

[GitHub](https://github.com/khangkhangkhan-g) ·
[Facebook](https://facebook.com/ngkph.m) ·
[Instagram](https://instagram.com/ngkpham)

</div>
'''

out = Path("/mnt/data/CONTEXT_BRIDGE_README.md")
out.write_text(readme, encoding="utf-8")
print(f"Created: {out}")
print(f"Characters: {len(readme):,}")
