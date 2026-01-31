# BrowserWing API Documentation

BrowserWing provides a RESTful API for browser automation, script management, and AI-powered interactions.

**Base URL**: `http://localhost:8080/api/v1`

## Authentication

The API supports two authentication methods:

### JWT Token
Include the token in the `Authorization` header:
```
Authorization: Bearer <token>
```

### API Key
Include the API key in the `X-BrowserWing-Key` header:
```
X-BrowserWing-Key: <api-key>
```

## Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check service health |

**Response:**
```json
{"status": "ok"}
```

---

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/login` | User login | No |
| GET | `/api/v1/auth/check` | Check auth status | No |

---

### Browser Control

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/browser/start` | Start browser instance |
| POST | `/api/v1/browser/stop` | Stop browser instance |
| GET | `/api/v1/browser/status` | Get browser status |
| POST | `/api/v1/browser/open` | Open a page in browser |

#### Cookie Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/browser/cookies/save` | Save browser cookies |
| POST | `/api/v1/browser/cookies/import` | Import cookies to browser |
| POST | `/api/v1/browser/cookies/delete` | Delete single cookie |
| POST | `/api/v1/browser/cookies/batch/delete` | Batch delete cookies |
| GET | `/api/v1/cookies/:id` | Get cookies by ID |

#### Recording

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/browser/record/start` | Start recording |
| POST | `/api/v1/browser/record/stop` | Stop recording |
| GET | `/api/v1/browser/record/status` | Get recording status |
| POST | `/api/v1/browser/record/clear-state` | Clear recording state |

#### Browser Instances

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/browser/instances` | Create browser instance |
| GET | `/api/v1/browser/instances` | List browser instances |
| GET | `/api/v1/browser/instances/current` | Get current instance |
| GET | `/api/v1/browser/instances/:id` | Get instance by ID |
| PUT | `/api/v1/browser/instances/:id` | Update instance |
| DELETE | `/api/v1/browser/instances/:id` | Delete instance |
| POST | `/api/v1/browser/instances/:id/start` | Start instance |
| POST | `/api/v1/browser/instances/:id/stop` | Stop instance |
| POST | `/api/v1/browser/instances/:id/switch` | Switch to instance |

---

### Browser Configurations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/browser-configs` | List browser configs |
| GET | `/api/v1/browser-configs/:id` | Get config by ID |
| POST | `/api/v1/browser-configs` | Create browser config |
| PUT | `/api/v1/browser-configs/:id` | Update browser config |
| DELETE | `/api/v1/browser-configs/:id` | Delete browser config |

---

### Scripts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/scripts` | List scripts |
| GET | `/api/v1/scripts/:id` | Get script by ID |
| POST | `/api/v1/scripts` | Create script |
| PUT | `/api/v1/scripts/:id` | Update script |
| DELETE | `/api/v1/scripts/:id` | Delete script |
| POST | `/api/v1/scripts/:id/play` | Execute script |
| GET | `/api/v1/scripts/play/result` | Get play result |
| GET | `/api/v1/scripts/summary` | Get scripts summary |

#### MCP Commands

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/scripts/:id/mcp/generate` | Generate MCP config |
| POST | `/api/v1/scripts/:id/mcp` | Toggle MCP command |

#### Batch Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/scripts/batch/group` | Batch set group |
| POST | `/api/v1/scripts/batch/tags` | Batch add tags |
| POST | `/api/v1/scripts/batch/delete` | Batch delete scripts |
| POST | `/api/v1/scripts/export/skill` | Export SKILL.md |

---

### Script Executions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/script-executions` | List executions |
| GET | `/api/v1/script-executions/:id` | Get execution by ID |
| DELETE | `/api/v1/script-executions/:id` | Delete execution |
| POST | `/api/v1/script-executions/batch/delete` | Batch delete |

---

### Prompts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/prompts` | List prompts |
| GET | `/api/v1/prompts/:id` | Get prompt by ID |
| POST | `/api/v1/prompts` | Create prompt |
| PUT | `/api/v1/prompts/:id` | Update prompt |
| DELETE | `/api/v1/prompts/:id` | Delete prompt |

---

### Executor API

Browser automation commands for AI agents and external integrations.

#### Help & Info

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/executor/help` | Get available commands |
| GET | `/api/v1/executor/export/skill` | Export SKILL.md |

#### Navigation & Actions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/executor/navigate` | Navigate to URL |
| POST | `/api/v1/executor/click` | Click element |
| POST | `/api/v1/executor/type` | Type text |
| POST | `/api/v1/executor/select` | Select dropdown |
| POST | `/api/v1/executor/hover` | Hover element |
| POST | `/api/v1/executor/wait` | Wait for element |
| POST | `/api/v1/executor/scroll-to-bottom` | Scroll to bottom |
| POST | `/api/v1/executor/go-back` | Go back |
| POST | `/api/v1/executor/go-forward` | Go forward |
| POST | `/api/v1/executor/reload` | Reload page |
| POST | `/api/v1/executor/press-key` | Press key |
| POST | `/api/v1/executor/resize` | Resize window |

#### Data Extraction

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/executor/get-text` | Get element text |
| POST | `/api/v1/executor/get-value` | Get element value |
| POST | `/api/v1/executor/extract` | Extract data |
| GET | `/api/v1/executor/page-info` | Get page info |
| GET | `/api/v1/executor/page-content` | Get page content |
| GET | `/api/v1/executor/page-text` | Get page text |

#### Accessibility & Elements

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/executor/snapshot` | Get accessibility snapshot |
| GET | `/api/v1/executor/clickable-elements` | Get clickable elements |
| GET | `/api/v1/executor/input-elements` | Get input elements |

#### Advanced Features

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/executor/screenshot` | Take screenshot |
| POST | `/api/v1/executor/evaluate` | Execute JavaScript |
| POST | `/api/v1/executor/batch` | Batch execute |
| POST | `/api/v1/executor/tabs` | Tab management |
| POST | `/api/v1/executor/fill-form` | Fill form |
| POST | `/api/v1/executor/file-upload` | Upload file |
| POST | `/api/v1/executor/drag` | Drag element |
| POST | `/api/v1/executor/close-page` | Close page |

#### Debug & Monitoring

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/executor/console-messages` | Get console messages |
| GET | `/api/v1/executor/network-requests` | Get network requests |
| POST | `/api/v1/executor/handle-dialog` | Handle JS dialog |

---

### MCP (Model Context Protocol)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/mcp/status` | Get MCP status | JWT |
| GET | `/api/v1/mcp/commands` | List MCP commands | JWT |
| GET | `/api/v1/mcp/commands_all` | List all commands | JWT |
| ANY | `/api/v1/mcp/sse` | SSE endpoint | API Key |
| ANY | `/api/v1/mcp/sse_message` | SSE message handler | API Key |

---

### MCP Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/mcp-services` | List MCP services |
| GET | `/api/v1/mcp-services/:id` | Get service by ID |
| POST | `/api/v1/mcp-services` | Create service |
| PUT | `/api/v1/mcp-services/:id` | Update service |
| DELETE | `/api/v1/mcp-services/:id` | Delete service |
| POST | `/api/v1/mcp-services/:id/toggle` | Toggle service |
| GET | `/api/v1/mcp-services/:id/tools` | Get service tools |
| POST | `/api/v1/mcp-services/:id/discover` | Discover tools |
| PUT | `/api/v1/mcp-services/:id/tools/:toolName` | Update tool status |

---

### LLM Configurations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/llm-configs` | List LLM configs |
| GET | `/api/v1/llm-configs/:id` | Get config by ID |
| POST | `/api/v1/llm-configs` | Create config |
| PUT | `/api/v1/llm-configs/:id` | Update config |
| DELETE | `/api/v1/llm-configs/:id` | Delete config |
| POST | `/api/v1/llm-configs/test` | Test config |

---

### Tool Configurations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tool-configs` | List tool configs |
| GET | `/api/v1/tool-configs/:id` | Get config by ID |
| PUT | `/api/v1/tool-configs/:id` | Update config |
| POST | `/api/v1/tool-configs/sync` | Sync configs |

---

### Recording Configuration

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/recording-config` | Get recording config |
| PUT | `/api/v1/recording-config` | Update recording config |

---

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | List users |
| GET | `/api/v1/users/:id` | Get user by ID |
| POST | `/api/v1/users` | Create user |
| PUT | `/api/v1/users/:id/password` | Update password |
| DELETE | `/api/v1/users/:id` | Delete user |

---

### API Keys

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/api-keys` | List API keys |
| GET | `/api/v1/api-keys/:id` | Get key by ID |
| POST | `/api/v1/api-keys` | Create API key |
| DELETE | `/api/v1/api-keys/:id` | Delete API key |

---

### Agent (AI Chat)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/agent/sessions` | Create session |
| GET | `/api/v1/agent/sessions` | List sessions |
| GET | `/api/v1/agent/sessions/:id` | Get session |
| DELETE | `/api/v1/agent/sessions/:id` | Delete session |
| POST | `/api/v1/agent/sessions/:id/messages` | Send message (SSE) |
| POST | `/api/v1/agent/llm/set` | Set LLM config |
| POST | `/api/v1/agent/llm/reload` | Reload LLM |
| GET | `/api/v1/agent/mcp/status` | Get MCP status |

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "error.code"
}
```

Common error codes:
- `error.unauthorized` - Authentication required
- `error.invalidToken` - Invalid JWT token
- `error.invalidApiKey` - Invalid API key
- `error.userNotFound` - User not found

## Technology Stack

- **Framework**: [Gin](https://github.com/gin-gonic/gin) (Go web framework)
- **Browser Automation**: [Rod](https://github.com/go-rod/rod)
- **Database**: BoltDB (embedded key-value store)
- **AI Integration**: MCP (Model Context Protocol)
