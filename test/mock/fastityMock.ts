import anything = jasmine.anything;

export default class FastityMock {

    mockDefaultRequest = (): any => {
        return {
            query: {},
            params: {},
            headers: {},
            body: {},
            id: 1,
            ip: "",
            ips: [""],
            hostname: "",
            raw: expect.any(anything()),
            req: expect.any(anything()),
            log: expect.any(anything())
        };

    };

    mockDefaultReply = () => {
        return {
            send: jest.fn((payload) => payload),
            code: expect.any(anything()),
            status: jest.fn((status) => status),
            header:expect.any(anything()),
            headers :expect.any(anything()),
            getHeader: expect.any(anything()),
            hasHeader: expect.any(anything()),
            removeHeader: expect.any(anything()),
            callNotFound: jest.fn(() => {}),
            getResponseTime: expect.any(anything()),
            type: expect.any(anything()),
            redirect: expect.any(anything()),
            serialize: expect.any(anything()),
            serializer: expect.any(anything()),
            sent: expect.any(anything()),
            res: expect.any(anything()),
            context: expect.any(anything()),
            request: expect.any(anything())
        };
    };

}