<div align="center">

# ContextBridge for ChatGPT

### Carry the context forward. Continue the work, not the repetition.

A lightweight Chrome extension that exports a ChatGPT conversation into a portable project handoff package - including conversation history, images, files, code, structured outputs, PDF/HTML archives, and continuation prompts for starting a new chat without losing direction.

<br>

![Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-5F6368)
![Language](https://img.shields.io/badge/UI-English%20%7C%20Ti%E1%BA%BFng%20Vi%E1%BB%87t-0A7EA4)
![Local First](https://img.shields.io/badge/Processing-Local--First-2E8B57)
![Version](https://img.shields.io/badge/Version-1.1.3-7A5AF8)

</div>

---

## English

### What is ContextBridge?

Long ChatGPT conversations are useful until they become difficult to continue.

A project may already contain:

- technical decisions
- previous fixes
- UI rules
- naming conventions
- screenshots
- uploaded files
- generated files
- code blocks
- tables
- project versions
- debugging history
- user preferences and working protocols

Starting a new conversation often means explaining all of that again.

**ContextBridge turns the current conversation into a portable handoff package that can be carried into a new ChatGPT thread.**

The goal is not to create "unlimited memory". The goal is to make conversation continuity portable, reviewable, and structured.

---

## Why use it?

Instead of doing this:

```text
Old Chat
   ↓
Conversation becomes too long
   ↓
Start New Chat
   ↓
Explain the project again
   ↓
Correct missing context
   ↓
Repeat old decisions
```

ContextBridge is designed for this workflow:

```text
Old Chat
   ↓
ContextBridge Export
   ↓
Portable ZIP Handoff
   ↓
New Chat
   ↓
Upload handoff + copy continuation prompt
   ↓
Continue from the existing project state
```

---

## Main Features

### 1. Conversation Capture

ContextBridge can capture the current ChatGPT conversation and preserve the working history in multiple formats.

The export may include:

- user messages
- assistant messages
- Markdown conversation archive
- structured JSON data
- standalone HTML archive
- PDF archive
- code blocks
- tables
- links
- images
- uploaded files
- generated files
- per-message exports

For compatibility, ContextBridge can use authenticated conversation data when available and fall back to rendered conversation content when necessary.

---

### 2. Separated Output Folders

Instead of storing everything in one large file, ContextBridge separates useful outputs into clear folders.

Example:

```text
ContextBridge_Export.zip
├── README_FIRST.txt
│
├── archive/
│   ├── conversation.html
│   ├── conversation.pdf
│   ├── conversation.md
│   └── conversation.json
│
├── handoff/
│   ├── CONTINUE.md
│   ├── context.json
│   └── prompts/
│       ├── ULTIMATE_CONTINUE_EN.txt
│       ├── ULTIMATE_CONTINUE_VI.txt
│       ├── ULTIMATE_MERGE_CONTEXTS_EN.txt
│       ├── ULTIMATE_MERGE_CONTEXTS_VI.txt
│       ├── ULTIMATE_RECONCILE_BRANCHES_EN.txt
│       ├── ULTIMATE_RECONCILE_BRANCHES_VI.txt
│       └── ULTIMATE_SELECTED.txt
│
├── messages/
│   ├── user/
│   └── assistant/
│
├── outputs/
│   ├── text/
│   ├── structured/
│   ├── code/
│   ├── tables/
│   ├── links/
│   ├── images/
│   └── files/
│
└── metadata/
    ├── manifest.json
    ├── capture_diagnostics.json
    ├── export_report.txt
    ├── export_report_final.txt
    └── unresolved/
```

This makes the export useful for both humans and AI.

---

### 3. AI-Ready Handoff

The most important file for continuation is:

```text
handoff/CONTINUE.md
```

It is designed to give the next conversation a compact view of the current project state without forcing the model to re-read every message first.

The handoff can include:

- recent conversation context
- current project direction
- important decisions
- unresolved issues
- relevant output inventory
- continuity instructions

The full archive remains available when deeper historical context is needed.

---

### 4. Ultimate Continuation Prompts

ContextBridge includes built-in continuation prompts directly inside the extension HUD.

Each prompt has its own scrollable clipboard area and a **Copy** button.

The prompt automatically switches between English and Vietnamese with the extension language selector.

There are three continuation modes.

#### Continue

Use when you have **one previous ChatGPT conversation** and want to continue that project in a new chat.

The prompt instructs the new conversation to recover:

- project state
- architecture
- versions
- terminology
- user preferences
- active protocols
- known bugs
- current development direction

It also tells the new conversation not to restart the project from zero.

#### Merge Contexts

Use when you have **two unrelated ChatGPT conversations** and want the new chat to understand both.

The prompt keeps both contexts logically separated and prevents project-specific rules from being mixed accidentally.

Useful when one new conversation needs access to two independent workstreams.

#### Reconcile Branches

Use when you have **two ChatGPT conversations that originated from the same earlier project but later diverged**.

The prompt instructs the model to identify:

- shared baseline
- approximate branch point
- changes introduced by Branch A
- changes introduced by Branch B
- compatible changes
- superseded decisions
- potential conflicts
- regression risks
- reconciled current state

This is conceptually similar to reconciling two development branches.

---

### 5. Prompt Information Helper

Next to the prompt mode selector is a small information button.

It explains when to use:

```text
Continue
Merge Contexts
Reconcile Branches
```

This helps users choose the correct continuation strategy before copying the prompt.

---

### 6. English / Vietnamese Interface

ContextBridge supports:

```text
English
Tiếng Việt
```

Changing the language updates:

- interface labels
- instructions
- guide text
- prompt names
- prompt descriptions
- Ultimate Prompt content

---

### 7. Images and File Preservation

ContextBridge attempts to preserve both uploaded and generated assets.

Supported export targets may include:

- uploaded images
- image attachments
- PDF files
- DOCX files
- ZIP files
- text files
- generated sandbox files
- other downloadable conversation assets

Failed or unavailable assets are recorded in the export report instead of being silently ignored.

---

### 8. Code, Tables and Links

Useful outputs are separated for easier reuse.

Examples:

```text
outputs/code/
outputs/tables/
outputs/links/
```

This is especially useful for long development, research, documentation, and debugging conversations.

---

### 9. HTML and PDF Archive

ContextBridge generates two human-readable archive formats.

**HTML** is the preferred high-fidelity archive for reviewing the conversation structure.

**PDF** is useful for portable reading, sharing, and offline reference.

The PDF renderer is designed to avoid relying on cross-origin canvas export for remote conversation assets.

---

## Interface

ContextBridge uses a minimal floating utility interface inside ChatGPT.

Typical workflow:

```text
ContextBridge
├── Scan chat
├── Export ZIP
├── Scope
├── Handoff depth
├── Export options
├── Language selector
├── Prompt mode
├── Prompt clipboard
├── Copy prompt
└── Guide
```

The floating ContextBridge chip can be repositioned, while the side panel can be resized.

Before scanning, make sure the conversation has fully loaded so ContextBridge can access as much of the history as possible.

---

## Installation

### 1. Extract the extension

Extract the ContextBridge release ZIP to a permanent folder.

Example:

```text
C:\Tools\ContextBridge
```

Do not delete the folder after loading the extension.

### 2. Open Chrome Extensions

Open:

```text
chrome://extensions
```

### 3. Enable Developer Mode

Turn on **Developer mode** in the top-right corner.

### 4. Load ContextBridge

Choose:

```text
Load unpacked
```

Select the extracted ContextBridge folder.

### 5. Refresh ChatGPT

Open ChatGPT and perform a full refresh:

```text
Ctrl + Shift + R
```

The ContextBridge chip should appear on the page.

---

## Updating ContextBridge

When updating from an older build:

```text
1. Extract the new release
2. Run UPDATE_EXISTING.bat
3. Select the folder currently used by Chrome
4. Open chrome://extensions
5. Click Reload on ContextBridge
6. Return to ChatGPT
7. Press Ctrl + Shift + R
```

You normally do not need to remove and reinstall the extension.

---

## How to Use

### Standard single-chat handoff

1. Open the conversation you want to preserve.
2. Make sure the full conversation has loaded.
3. Open ContextBridge.
4. Click **Scan chat**.
5. Review the detected message, image, file, and code counts.
6. Choose your export options.
7. Click **Export ZIP**.
8. Start a new ChatGPT conversation.
9. Upload `handoff/CONTINUE.md` and any relevant project files.
10. Select **Continue** in ContextBridge.
11. Copy the Ultimate Prompt.
12. Paste it into the new chat.
13. Continue working.

---

## Two-Conversation Workflows

### Two unrelated chats

Export both conversations separately.

In the new conversation:

1. Upload both handoff packages or their relevant handoff files.
2. Select **Merge Contexts**.
3. Copy the prompt.
4. Paste it into the new chat.

The prompt instructs the model to maintain separate internal context boundaries rather than combining unrelated project rules.

### Two related branches

If two chats share an earlier project history but later diverged:

1. Export both branches.
2. Upload both handoff packages.
3. Select **Reconcile Branches**.
4. Copy the prompt.
5. Paste it into the new conversation.

The new chat is instructed to focus on post-branch changes, conflicts, regressions, and the latest compatible project state.

---

## Recommended Export Settings

For a full project handoff, enable:

```text
✓ PDF archive
✓ HTML archive
✓ Markdown + JSON
✓ Images + files
✓ Separated output folders
```

For long technical projects, a handoff depth of around 50 to 100 recent messages is usually more useful than blindly copying the entire conversation into the continuation prompt.

The complete archive is still exported for historical lookup.

---

## Privacy and Security

ContextBridge is designed as a local-first utility.

It does not require a separate ContextBridge account.

The extension does not intentionally send exported conversation content to a ContextBridge server.

For authenticated ChatGPT conversation and asset access, ContextBridge may use authentication already available to the active ChatGPT session in the browser. Authentication material is intended for in-memory use and should not be included in exported ZIP files.

Because exported conversations may contain private information, source code, screenshots, uploaded documents, or generated files, treat exported ZIP packages as sensitive data.

Do not publish an export publicly without reviewing its contents first.

---

## Known Limitations

ContextBridge interacts with the ChatGPT web application, so compatibility may change when the website changes.

Possible limitations include:

- very old conversations may require additional loading before scanning
- some expired assets may no longer be downloadable
- unavailable files may be preserved only as references
- large conversations can take longer to process
- extremely large assets may require additional handling
- HTML and PDF serve different purposes and may not look identical
- internal ChatGPT web behavior may change over time and require compatibility updates

ContextBridge records diagnostic information and unresolved assets where possible to make failures easier to investigate.

---

## Who is this for?

ContextBridge is especially useful for:

- developers maintaining long coding conversations
- designers iterating on UI and product decisions
- researchers working across large source-heavy chats
- students managing long study sessions
- project managers tracking evolving requirements
- writers maintaining terminology and editorial rules
- anyone who regularly reaches the point where a ChatGPT conversation becomes difficult to continue cleanly

---

## Project Philosophy

ContextBridge follows a simple principle:

> **Conversation history should be portable.**

A useful AI conversation contains more than text. It contains decisions, constraints, files, versions, corrections, terminology, protocols, and project direction.

ContextBridge attempts to package that working history so the next conversation can continue from where the previous one stopped.

---

## Vietnamese

### ContextBridge là gì?

Một cuộc trò chuyện ChatGPT dài có thể chứa rất nhiều context quan trọng:

- quyết định kỹ thuật
- các bản fix trước đó
- quy tắc UI
- cách đặt tên
- screenshot
- file đã upload
- file được AI tạo
- code
- table
- version project
- lịch sử debug
- preference và protocol làm việc của người dùng

Khi cuộc chat quá dài và phải chuyển sang một chat mới, vấn đề thường gặp là phải giải thích lại gần như toàn bộ project.

**ContextBridge biến conversation hiện tại thành một gói bàn giao có cấu trúc để mang sang một cuộc trò chuyện ChatGPT mới.**

Mục tiêu của ContextBridge không phải là tạo ra "bộ nhớ vô hạn" cho ChatGPT. Mục tiêu là làm cho context của conversation có thể được lưu lại, kiểm tra và tiếp tục sử dụng.

---

## ContextBridge giải quyết vấn đề gì?

Thay vì:

```text
Chat cũ
   ↓
Conversation quá dài
   ↓
Tạo chat mới
   ↓
Giải thích project lại từ đầu
   ↓
Sửa những context AI hiểu sai
   ↓
Nhắc lại những quyết định cũ
```

ContextBridge hướng tới workflow:

```text
Chat cũ
   ↓
ContextBridge Export
   ↓
ZIP bàn giao
   ↓
Chat mới
   ↓
Upload handoff + copy continuation prompt
   ↓
Tiếp tục đúng trạng thái project hiện tại
```

---

## Tính năng chính

### 1. Quét conversation

ContextBridge có thể quét conversation ChatGPT hiện tại và lưu lại working history ở nhiều định dạng.

Gói export có thể bao gồm:

- tin nhắn người dùng
- tin nhắn assistant
- archive Markdown
- dữ liệu JSON có cấu trúc
- archive HTML độc lập
- archive PDF
- code block
- table
- link
- hình ảnh
- file upload
- file do AI tạo
- file riêng cho từng message

Để tăng khả năng tương thích, ContextBridge có thể ưu tiên dữ liệu conversation đã được authenticated khi khả dụng và fallback sang nội dung đang được render khi cần.

---

### 2. Tự động chia output thành folder

Thay vì nhét mọi thứ vào một file duy nhất, ContextBridge chia output thành các folder rõ ràng.

Ví dụ:

```text
ContextBridge_Export.zip
├── README_FIRST.txt
│
├── archive/
│   ├── conversation.html
│   ├── conversation.pdf
│   ├── conversation.md
│   └── conversation.json
│
├── handoff/
│   ├── CONTINUE.md
│   ├── context.json
│   └── prompts/
│       ├── ULTIMATE_CONTINUE_EN.txt
│       ├── ULTIMATE_CONTINUE_VI.txt
│       ├── ULTIMATE_MERGE_CONTEXTS_EN.txt
│       ├── ULTIMATE_MERGE_CONTEXTS_VI.txt
│       ├── ULTIMATE_RECONCILE_BRANCHES_EN.txt
│       ├── ULTIMATE_RECONCILE_BRANCHES_VI.txt
│       └── ULTIMATE_SELECTED.txt
│
├── messages/
│   ├── user/
│   └── assistant/
│
├── outputs/
│   ├── text/
│   ├── structured/
│   ├── code/
│   ├── tables/
│   ├── links/
│   ├── images/
│   └── files/
│
└── metadata/
    ├── manifest.json
    ├── capture_diagnostics.json
    ├── export_report.txt
    ├── export_report_final.txt
    └── unresolved/
```

Cấu trúc này giúp cả người dùng lẫn AI dễ đọc và dễ truy xuất hơn.

---

### 3. AI-ready Handoff

File quan trọng nhất khi chuyển sang chat mới là:

```text
handoff/CONTINUE.md
```

File này được thiết kế để cung cấp cho chat mới một bản tóm tắt có cấu trúc về trạng thái project hiện tại mà không bắt AI phải đọc lại toàn bộ conversation ngay từ đầu.

Handoff có thể chứa:

- context gần nhất
- hướng phát triển hiện tại
- các quyết định quan trọng
- issue chưa xử lý
- danh sách output liên quan
- hướng dẫn continuity

Full archive vẫn được giữ để tra lại lịch sử khi cần.

---

### 4. Ultimate Continuation Prompt

ContextBridge tích hợp sẵn prompt continuation ngay trong HUD.

Prompt có vùng clipboard riêng với scrollbar và nút **Copy**.

Khi chuyển dropdown giữa English và Tiếng Việt, nội dung prompt cũng tự đổi ngôn ngữ.

Có ba mode.

#### Tiếp tục

Dùng khi có **một conversation cũ** và muốn tiếp tục chính project đó trong chat mới.

Prompt yêu cầu chat mới khôi phục:

- trạng thái project
- architecture
- version
- terminology
- preference của người dùng
- protocol đang áp dụng
- bug đã biết
- hướng phát triển gần nhất

Đồng thời yêu cầu AI không restart project từ đầu.

#### Gộp ngữ cảnh

Dùng khi có **hai conversation hoàn toàn độc lập** nhưng muốn một chat mới hiểu cả hai.

Prompt giữ hai context tách biệt về mặt logic, tránh việc protocol hoặc quyết định của project này bị áp nhầm sang project kia.

Phù hợp khi một workspace mới cần xử lý đồng thời hai workstream khác nhau.

#### Hợp nhất nhánh

Dùng khi có **hai conversation có chung lịch sử gốc nhưng sau đó phát triển thành hai nhánh khác nhau**.

Prompt yêu cầu AI xác định:

- baseline chung
- branch point
- thay đổi chỉ có ở nhánh A
- thay đổi chỉ có ở nhánh B
- thay đổi tương thích
- quyết định đã bị thay thế
- potential conflict
- regression risk
- trạng thái project sau khi reconcile

Có thể hiểu gần giống việc merge hai development branch.

---

### 5. Nút thông tin cho Prompt Mode

Bên cạnh Prompt Mode có một nút **i** nhỏ.

Nút này giải thích mục đích của từng mode:

```text
Tiếp tục
Gộp ngữ cảnh
Hợp nhất nhánh
```

Người dùng có thể hiểu nhanh nên chọn prompt nào trước khi copy.

---

### 6. Giao diện song ngữ Anh / Việt

ContextBridge hỗ trợ:

```text
English
Tiếng Việt
```

Khi đổi ngôn ngữ, extension cập nhật đồng thời:

- label UI
- hướng dẫn
- Guide
- tên prompt mode
- phần giải thích prompt
- nội dung Ultimate Prompt

---

### 7. Lưu hình ảnh và file

ContextBridge cố gắng lưu lại cả asset được upload và asset được tạo trong conversation.

Các loại output có thể bao gồm:

- ảnh upload
- image attachment
- PDF
- DOCX
- ZIP
- text file
- file được tạo trong sandbox
- các asset khác có thể download từ conversation

Asset không thể lấy được sẽ được ghi lại trong export report thay vì bị bỏ qua im lặng.

---

### 8. Tách riêng Code, Table và Link

Các output hữu ích được tách riêng để dễ tái sử dụng:

```text
outputs/code/
outputs/tables/
outputs/links/
```

Phù hợp cho các conversation dài về development, research, documentation hoặc debugging.

---

### 9. Archive HTML và PDF

ContextBridge tạo hai định dạng archive dễ đọc.

**HTML** phù hợp nhất khi cần xem lại cấu trúc conversation với độ fidelity cao.

**PDF** phù hợp để đọc offline, lưu trữ hoặc chia sẻ.

PDF renderer được thiết kế để không phụ thuộc vào việc export cross-origin canvas từ asset remote của conversation.

---

## Giao diện

ContextBridge sử dụng một floating utility panel tối giản bên trong ChatGPT.

Workflow chính:

```text
ContextBridge
├── Quét chat
├── Xuất ZIP
├── Phạm vi
├── Độ sâu handoff
├── Tuỳ chọn export
├── Ngôn ngữ
├── Prompt mode
├── Prompt clipboard
├── Copy prompt
└── Hướng dẫn
```

Chip ContextBridge có thể kéo sang vị trí khác và panel có thể resize.

Trước khi quét, hãy đảm bảo conversation đã load đầy đủ để extension có thể lấy được nhiều lịch sử nhất có thể.

---

## Cài đặt

### 1. Giải nén extension

Giải nén file release của ContextBridge vào một folder cố định.

Ví dụ:

```text
C:\Tools\ContextBridge
```

Không xóa folder sau khi load extension vào Chrome.

### 2. Mở Chrome Extensions

Truy cập:

```text
chrome://extensions
```

### 3. Bật Developer Mode

Bật **Developer mode** ở góc trên bên phải.

### 4. Load ContextBridge

Chọn:

```text
Load unpacked
```

Sau đó chọn folder ContextBridge đã giải nén.

### 5. Refresh ChatGPT

Mở ChatGPT và refresh đầy đủ:

```text
Ctrl + Shift + R
```

Chip ContextBridge sẽ xuất hiện trên trang.

---

## Cập nhật phiên bản mới

Khi update từ version cũ:

```text
1. Giải nén release mới
2. Chạy UPDATE_EXISTING.bat
3. Chọn folder ContextBridge hiện tại đang được Chrome sử dụng
4. Mở chrome://extensions
5. Bấm Reload ở ContextBridge
6. Quay lại ChatGPT
7. Nhấn Ctrl + Shift + R
```

Thông thường không cần remove và cài lại extension.

---

## Cách sử dụng

### Chuyển một chat sang conversation mới

1. Mở conversation cần lưu.
2. Đảm bảo toàn bộ đoạn chat cần thiết đã được load.
3. Mở ContextBridge.
4. Bấm **Quét chat**.
5. Kiểm tra số lượng message, image, file và code được phát hiện.
6. Chọn option export.
7. Bấm **Xuất ZIP**.
8. Tạo một ChatGPT conversation mới.
9. Upload `handoff/CONTINUE.md` cùng các project file cần thiết.
10. Chọn mode **Tiếp tục** trong ContextBridge.
11. Copy Ultimate Prompt.
12. Paste prompt vào chat mới.
13. Tiếp tục project.

---

## Workflow với hai conversation

### Hai chat không liên quan

Export riêng từng conversation.

Trong chat mới:

1. Upload cả hai handoff package hoặc các file handoff cần thiết.
2. Chọn **Gộp ngữ cảnh**.
3. Copy prompt.
4. Paste vào chat mới.

Prompt yêu cầu AI giữ hai context tách biệt thay vì trộn project-specific rule với nhau.

### Hai chat là hai nhánh của cùng một project

Nếu hai chat có chung lịch sử gốc nhưng sau đó tách nhánh:

1. Export cả hai branch.
2. Upload cả hai handoff package.
3. Chọn **Hợp nhất nhánh**.
4. Copy prompt.
5. Paste vào conversation mới.

Chat mới sẽ tập trung vào các thay đổi sau branch point, conflict, regression và trạng thái project mới nhất có thể reconcile.

---

## Export setting khuyến nghị

Để bàn giao project đầy đủ, nên bật:

```text
✓ PDF archive
✓ HTML archive
✓ Markdown + JSON
✓ Images + files
✓ Separated output folders
```

Với project kỹ thuật dài, handoff depth khoảng 50 đến 100 message gần nhất thường hữu ích hơn việc nhét toàn bộ conversation vào continuation prompt.

Full archive vẫn được lưu để tra cứu khi cần.

---

## Privacy và Security

ContextBridge được thiết kế theo hướng local-first.

Extension không yêu cầu tài khoản ContextBridge riêng.

ContextBridge không chủ động gửi nội dung conversation đã export lên một ContextBridge server riêng.

Để truy cập conversation và asset đã được authenticated trong ChatGPT, extension có thể sử dụng authentication đã tồn tại trong session ChatGPT đang mở trên browser. Authentication material chỉ nên được sử dụng tạm thời trong memory và không được đưa vào ZIP export.

Vì ZIP có thể chứa thông tin cá nhân, source code, screenshot, tài liệu upload hoặc file được tạo trong conversation, hãy xem export package như dữ liệu nhạy cảm.

Không nên public một export trước khi kiểm tra nội dung bên trong.

---

## Giới hạn hiện tại

ContextBridge làm việc với ChatGPT web app nên có thể cần cập nhật khi website thay đổi.

Một số giới hạn có thể gặp:

- conversation rất cũ có thể cần load thêm trước khi scan
- asset hết hạn có thể không còn download được
- một số file không còn khả dụng chỉ có thể lưu reference
- conversation rất lớn sẽ cần nhiều thời gian xử lý hơn
- asset quá lớn có thể cần thêm handling
- HTML và PDF phục vụ mục đích khác nhau nên không nhất thiết giống nhau hoàn toàn
- thay đổi internal behavior của ChatGPT có thể yêu cầu compatibility update

ContextBridge cố gắng lưu diagnostic và danh sách unresolved asset để việc debug dễ hơn.

---

## Phù hợp với ai?

ContextBridge đặc biệt hữu ích cho:

- developer có conversation code dài
- designer liên tục chỉnh UI và product decision
- researcher làm việc với nhiều source
- sinh viên có study session dài
- project manager theo dõi requirement thay đổi theo thời gian
- writer cần giữ terminology và editorial rule
- bất kỳ ai thường xuyên gặp tình trạng conversation quá dài nhưng vẫn cần tiếp tục đúng context

---

## Triết lý của project

ContextBridge được xây dựng dựa trên một ý tưởng đơn giản:

> **Conversation history nên có khả năng mang theo.**

Một conversation AI hữu ích không chỉ có text. Nó còn chứa quyết định, constraint, file, version, correction, terminology, protocol và hướng phát triển.

ContextBridge cố gắng đóng gói toàn bộ working history đó để conversation tiếp theo có thể tiếp tục đúng nơi conversation trước dừng lại.

---

## Support / Feedback

If you find a bug, include the following files when possible:

```text
metadata/capture_diagnostics.json
metadata/export_report_final.txt
```

These files make it easier to identify whether a problem comes from conversation capture, authentication, image/file resolution, PDF generation, or another compatibility issue.

---

## Copyright

**Copyright © 2026 Nguyen Khang. All Rights Reserved.**

Facebook: https://www.facebook.com/ngkph.m

